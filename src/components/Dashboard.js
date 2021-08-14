import React from 'react';
import Chart from './chart/BarChart';
import ProjectList from './projects-list/ProjectsList';
import TimeSummary from './chart/TimeSummary';
import RangeSelector from './chart/RangeSelector'
import DateSelector from './chart/DateSelector'
import Auth from './auth/Auth';

class Projects extends React.Component {
  static colors = [
    "rgba(230, 66, 57, 1)",
    "rgba(242, 144, 82, 1)",
    "rgba(245, 181, 97, 1)",
    "rgba(136, 194, 138, 1)",
    "rgba(71, 181, 159, 1)",
    "rgba(177, 225, 216, 1)",
    "rgba(6, 95, 70)", // dark green
    "rgba(59, 130, 246)", // dark blue
    "rgba(249, 168, 212)", // dark pink
    "rgba(76, 29, 149)", // dark purple
    "rgba(167, 139, 250)", // light purple
  ];

  constructor(props) {
    super(props);
    this.state = {
      projectTitle: "All Projects",
      isWeekly: true,
      projects: null,
      timeEntries: null,
      activeDate: new Date(),
      activeWeek: this.getWeekFor(new Date()),
    }
    this.handleRangeToDay = this.handleRangeToDay.bind(this);
    this.handleRangeToWeek = this.handleRangeToWeek.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
  }

  async _getDataAfterRefresh() {
    await Auth.get("/refresh");
    await setTimeout(async function() {
      await Promise.all([Auth.get(`/projects`), Auth.get('/time_entries')])
        .then(dataSets => {
          console.log('datasets are', dataSets);
          this.props.unsetRefreshFlag();
          this.setState({
            projects: dataSets[0],
            timeEntries: dataSets[1],
          });
        });
    }.bind(this), 5000);
  }

  async componentDidMount() {
    await this._getDataAfterRefresh();
  }

  componentWillUnmount() {
    this.props.setRefreshFlag();
  }

  handleNewData(e) {
    e.preventDefault(e);

    this.setState({
      shouldRefresh: true,
    });
  }

  getListData() {
    let colors = Projects.colors.slice();
    let projects = this.getAllProjects();
    let getTotalTime = (this.state.isWeekly) ? this.durationForActiveWeek.bind(this) : this.durationForActiveDate.bind(this);

    projects.forEach(project => project.duration = getTotalTime(project.id));

    return projects.filter(project => this._hasDuration(project.duration))
      .map(project => this.formatListRow(project, colors));
  }

  formatListRow(project, colors) {
    return {
      id: project.id,
      name: this._formatName(project.name),
      due_date: this._formatDueDate(project.due_date),
      duration: this._formatTotalHours(project.duration),
      durations: project.durations,
      source: this._formatName(project.source),
      color: colors.shift(),
    }
  }

  getChartData() {
    if (!this.state.isWeekly) return this.getDailyChartData();
    return {
      labels: this.getWeeklyChartLabels(),
      datasets: this.getWeeklyChartData()
    }
  }

  getWeeklyChartLabels() {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return labels.map((label, idx) => {
      let date = this.state.activeWeek[idx];
      return `${label};${date.getMonth() + 1}/${date.getDate()}`;
    });
  }

  getWeeklyChartData() {
    let colors = Projects.colors.slice();
    let projects = this.getAllProjects();

    projects.forEach(project => {
      project.durations = this.dailyDurationsForWeek(project.id)
        .map(duration => this._formatChartDuration(duration));
    });

    return projects
      .filter(project => this._hasDuration(project.durations))
      .map(project => {
        return {
          id: project.id,
          label: project.name,
          data: project.durations,
          duration: project.durations.reduce((total, duration) => total += duration),
          backgroundColor: colors.shift(),
        };
      });
  }

  getDailyChartData() {
    let colors = Projects.colors.slice();
    let projects = this.getAllProjects();

    projects = projects.map(project => {
      let duration = this.durationForActiveDate(project.id);
      project.duration = this._formatChartDuration(duration);
      return project;
    }).filter(project => this._hasDuration(project.duration));

    return {
      labels: projects.map(project => project.name),
      datasets: [{
        barPercentage: 0.5,
        data: projects.map(project => project.duration),
        backgroundColor: projects.map(project => colors.shift()),
      }],
    };
  }

  getTimeSummary() {
    let entries;
    if (this.state.isWeekly) {
      entries = this.state.activeWeek.map(day => {
        return this.allEntriesForDate(day)
          .map(entry => entry.duration_seconds)
          .reduce((total, duration) => (duration > 0) ? total + duration : total, 0);
      });
    } else {
      entries = this.allEntriesForDate(this.state.activeDate).map(entry => entry.duration_seconds);
    }

    let totalTime = entries.reduce((total, duration) => (duration > 0) ? total + duration : total, 0);
    return this._formatTotalHours(totalTime);
  }

  getAllProjects() {
    if (this.state.projects === null) return [];

    return this.state.projects.slice()
      .map(project => {
        project.name = this._formatName(project.name);
        return project;
      })
      .sort(this._orderByName);
  }

  getAllEntries() {
    if (this.state.timeEntries === null) return [];
    return this.state.timeEntries.slice();
  }

  allEntriesForDate(date) {
    return this.getAllEntries().filter(timeEntry => this._isSameDay(timeEntry.started_at, date));
  }

  allProjectEntries(projectId) {
    return this.getAllEntries().filter(timeEntry => timeEntry.project_id === projectId);
  }

  projectEntriesForDate(projectId, date) {
    return this.allProjectEntries(projectId)
      .filter(timeEntry => this._isSameDay(timeEntry.started_at, date));
  }

  dailyDurationsForWeek(projectId) {
    let entries = this.state.activeWeek.map(date => this.projectEntriesForDate(projectId, date));

    return entries.map(timeEntry => {
      return timeEntry.reduce((total, timeEntry) => (timeEntry.duration_seconds > 0) ? total += timeEntry.duration_seconds : total, 0);
    });
  }

  durationForActiveDate(projectId) {
    let entries = this.projectEntriesForDate(projectId, this.state.activeDate);
    return entries.reduce((total, timeEntry) => (timeEntry.duration_seconds > 0) ? total += timeEntry.duration_seconds : total, 0);
  }

  durationForActiveWeek(projectId) {
    return this.dailyDurationsForWeek(projectId).reduce((total, duration) => (duration > 0) ? total += duration : total, 0);
  }

  _isSameDay(date1, date2) {
    [date1, date2] = [new Date(date1), new Date(date2)];
    return date1.toDateString() === date2.toDateString();
  }

  _hasDuration(durations) {
    return [].concat(durations).reduce((total, duration) => (duration > 0) ? total += duration : total, 0) !== 0;
  }

  _formatChartDuration(duration) {
    let h = Math.floor(duration / 3600);
    let m = Math.floor(duration % 3600 / 60);
    let p = Math.round((m / 60) * 100);

    let num = `${h}.${p}`;
    return Number(num)
  }

  _formatTotalHours(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    if (h < 10) h = ` ${h}`;
    if (m < 10) m = `0${m}`;
    return `${h}h ${m}m`;
  };

  _formatDueDate(dueDate) {
    if (dueDate === null) return '--';

    let date = new Date(dueDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${date.getFullYear()}`;
  };

  _formatName(name) {
    return name ? name[0].toUpperCase() + name.slice(1) : "None";
  }

  _orderByName(a, b) {
    let nameA = (a.name || "").toLowerCase();
    let nameB = (b.name || "").toLowerCase();

    if (nameA < nameB) return -1;
    if (nameB > nameA) return 1;
    return 0;
  };

  getChartTitle() {
    if (!this.state.isWeekly) {
      let date = this.state.activeDate;
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.toLocaleString('default', { year: 'numeric' })}`;
    }

    let [startDate, endDate] = [this.getPreviousMonday(this.state.activeDate), this.getNextSunday(this.state.activeDate)];
    let [startDay, endDay] = [startDate.getDate(), endDate.getDate()];
    let [startMonth, endMonth] = [startDate.toLocaleString('default', { month: 'short' }), endDate.toLocaleString('default', { month: 'short' })];
    let [startYear, endYear] = [startDate.toLocaleString('default', { year: 'numeric' }), endDate.toLocaleString('default', { year: 'numeric' })];

    if (startYear !== endYear) return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`
    if (startMonth !== endMonth) return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`
    return `${startDay} - ${endDay} ${endMonth} ${endYear}`
  }

  getWeekFor(date) {
    let startDate = this.getPreviousMonday(date);
    let dates = [];

    for (let i = 0; i < 7; i++) {
      startDate.setDate(startDate.getDate() + (i === 0 ? 0 : 1));
      dates.push(new Date(startDate));
    }

    return dates;
  }

  getPreviousMonday(date) {
    date = new Date(date);
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    return date;
  }

  getNextSunday(date) {
    date = new Date(date);
    date.setDate(date.getDate() + (7 - date.getDay()) % 7);
    return date;
  }

  handleNext(e) {
    e.preventDefault();
    let currentDate = this.state.activeDate;
    let newDate = new Date(currentDate);

    newDate.setDate(currentDate.getDate() + (this.state.isWeekly ? 7 : 1));

    this.setState({
      activeDate: new Date(newDate),
      activeWeek: this.getWeekFor(new Date(newDate))
    });
    // then in componentDidUpdate, check if need to fetch more data
  }

  handlePrev(e) {
    e.preventDefault();
    let currentDate = this.state.activeDate;
    let newDate = new Date(currentDate);

    newDate.setDate(currentDate.getDate() - (this.state.isWeekly ? 7 : 1));

    this.setState({
      activeDate: new Date(newDate),
      activeWeek: this.getWeekFor(new Date(newDate))
    });
  }

  handleRangeToWeek(e) {
    e.preventDefault();
    this.setState({
      isWeekly: true
    });
  }

  handleRangeToDay(e) {
    e.preventDefault();
    this.setState({
      isWeekly: false,
    });
  }

  render() {
    if (this.props.getRefreshFlag()) return <div className="mt-4">Loading...</div>

    return (
      <div className="flex flex-col w-11/12 max-w-xl">
        <div className="flex justify-between items-end mt-7 mb-6">
          <div className="flex flex-col items-start">
            <h2 className="text-lg mb-px italic font-light">
              {this.state.projectTitle}
            </h2>
            <RangeSelector isWeekly={this.state.isWeekly} handleRangeToDay={this.handleRangeToDay} handleRangeToWeek={this.handleRangeToWeek} />
          </div>
          <DateSelector chartTitle={this.getChartTitle()} handleNext={this.handleNext} handlePrev={this.handlePrev} />
        </div>
        <Chart data={this.getChartData()} />
        <div className="flex items-end w-full justify-between mt-6 mb-4">
          <TimeSummary totalTime={this.getTimeSummary()} />
        </div>
        <ProjectList projects={this.getListData()} />
      </div>
    );
  }
}

export default Projects;