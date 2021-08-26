import React from 'react';
import NonAuthNav from './common/NonAuthNav';
import Auth from './auth/Auth';

class WriteUp extends React.Component {
  async handleSampleUser(e) {
    try {
      await Auth.defaultLogin();
      this.props.history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  }

  makeHeader(title, size, color) {
    let textSizes = ["text-5xl", "text-4xl", "text-3xl", "text-2xl", "text-lg", "text-lg"]
    let hSize = +size.split("")[1] - 1;
    color = color ? `text-${color}-500` : ""
    return (
      <h2 className={`${textSizes[hSize]} md:${textSizes[hSize]} ${color} font-extrabold my-4 mx-2`}>{title}</h2>
    );
  }

  makeImage(src, alt, caption) {
    return (
      <figure className={`flex flex-col gap-2 shadow-inner items-center justify-center my-10 bg-gradient-to-b from-green-300 via-yellow-200 to-red-100 rounded-md p-8 ${caption ? "pt-2" : ""}`}>
        <figcaption className="text-center text-md text-gray-800 font-medium self-center">{caption}</figcaption>
        <img className="rounded-lg shadow-xl"
          src={`${process.env.PUBLIC_URL}/images/writeup/${src}`}
          alt={alt}>
        </img>
      </figure>
    );
  }

  makeParagraph(text) {
    return (
      <p className={"my-2 mx-2"}>{text}</p>
    );
  }

  render() {
    return (
      <div className="text-gray-700 bg-gradient-to-b from-gray-100 to-white">
        <NonAuthNav/>
        <div className="max-w-2xl mx-auto pt-20">
          {this.makeHeader("Case Study", "h1", "red")}
          <section className="mt-10">
            {this.makeHeader("1) Abstract", "h2", "yellow")}
            {this.makeParagraph(`TimeHub aggregates your time tracking data by extracting it from third party time tracking APIs,
              transforming it into a normalized format, and loading it into a database that feeds a dynamic dashboard.`)}
          </section>
          <section className="">
            {this.makeHeader("2) How Timehub Works", "h2", "green")}
            {this.makeParagraph(`Timehub is comprised of a Rails RESTful API that does the ETL and stores the data, and a React app that handles the front-end state.`)}
            <section>
              {this.makeHeader("2.1) One API To Rule Them All", "h3", "green")}
              {this.makeParagraph(`The backend API is the interface between the normalised data and the React app. It uses access tokens to extract user data from third-party APIs.`)}
              {this.makeParagraph('The backend then standardizes and loads this data to 2 databases — a MongoDB and PostgreSQL database. The app programmatically updates user data through cron and Active jobs.')}
              {this.makeImage('diagram_1.png', "a diagram")}
              {this.makeParagraph(`On the front-end, data access is authorized through the use of a JSON web token (JWT).
                When data is requested by the React app, authentication is first asserted by the server before a JSON payload is sent as response.
                This JSON data is used to update the display in the dashboard, which is made with React, Tailwinds, and Chart.js.`)}
              {this.makeImage('diagram_2.png', "a diagram", "From ETL to dashboard")}
            </section>
            <section>
              {this.makeHeader("2.2) Processing and Normalizing Data", "h3", "green")}
              {this.makeParagraph("After fetching the data from the third-party time trackers, the backend API normalizes it into a shared format.")}
              {this.makeParagraph("The ERD exemplifies an easy-to-follow linear relationship of entities with each entity having a one to one-to-many relationship of the entity below it.")}
              {this.makeImage('diagram_3.png', "a diagram", "The ERD")}
              {this.makeParagraph("The users and sources tables were designed in a one user to one-to-many sources relationship. This was chosen to showcase how a user could have up to three sources, corresponding to the 3rd party APIs, supported. Each of these sources could then have its own set of time tracking data, with one source having one or many workspaces that encompassed all this data.")}
              {this.makeParagraph("Only the email, name, and password digest are stored for a user. The actual password is never stored. The JWT passed along with every request is used to verify the user against the associated password digest.")}
              {this.makeParagraph("Since there were only three possible sources, the decision was made to categorize them by the name attribute. The name attribute could only be one of three options: “harvest”, “toggl”, or “clockify”. In addition, the specific information needed from the user to access their information is stored in the access_token and account_id fields. Of note, Harvest was the only 3rd party API supported that required an account id for fetching data, so for toggl and clockify sources, this field defaults to nil.")}
              {this.makeParagraph("The tables workspaces, projects, tasks, and time entries above were chosen in efforts to normalize data in a linear and easy-to-follow fashion. Many of the 3rd party APIs did not have the same exact entities, but a common pattern was seen of time entries being linked to projects and projects being a part of workspaces. Tasks were added as a link between projects and time entries to accommodate the 3rd party APIs that did use tasks, and because it made logical sense for a project to have one or many tasks which each had one or many time entries.")}
              {this.makeParagraph("3rd party API data that did not support any of these entities were given generic entries in the table for the entity it did not support, so that the data would be able to follow this linear model relationship. The attributes of these tables were selected in efforts to keep viewing the data very simple and easy to follow. Most of these tables just contain the name of the specific entity and foreign keys, as well as original ids in order to keep a link to the data stored in the MongoDB NoSQL database. Notably, the projects table includes start and end dates (optional) in case a project has a certain due date or max time allotted. Also, the time entries table has a duration_seconds attribute that is used to calculate all time calculations throughout the app.")}
              {this.makeHeader("To implement the ERD, we had to answer some questions of the ETL process:", "h5")}
              <ul className="font-semibold flex">
                <li className="flex-1 px-2 py-4 text-center bg-red-100">How could we fetch a user’s data while avoiding the transfer of unnecessary data?</li>
                <li className="flex-1 px-2 py-4 text-center bg-yellow-100">How could we avoid requests taking a long time and (possibly) leading to HTTP timeouts?</li>
                <li className="flex-1 px-2 py-4 text-center bg-green-100">How could we avoid losing user’s data due to problems in an adapter’s logic (for example, if one of the services’ APIs change)?</li>
              </ul>
            </section>
            <section>
              {this.makeParagraph("The first two problems were partially solved by using the pagination features built-in to the external APIs we were consuming, as well as using some limits on the amount of data fetched.")}
              {this.makeParagraph("Each 3rd party API used pagination features, so for every request only the first page was retrieved. In addition, for Harvest, we limited the amount of data fetched for a first time user to 1 month and limited the amount of data fetched during cron jobs to only anything updated in the last 30 minutes. The default feature of pulling data only up to 12 days old was used for Toggl.")}
              {this.makeParagraph("A second decision that helped prevent data loss was to dump requested data into a MongoDB document store.")}
              {this.makeParagraph("Dumping requested raw data into a document store gave us more control over our data and decoupled the data’s extraction from its processing. Regardless of how our data was handled in our app, we had the certainty of having the raw data in Mongo. This came at the expense of having a second database and making the database insertions before data was processed.")}
              {this.makeParagraph("We still used a second, relational database. After the data was dumped into MongoDB, we processed the data in-memory into a normalized format and inserted it into our PostgreSQL database (which we chose because we were deploying on Heroku). Using a relational database for persistent storage gave us the advantage of more reliably and predictably storing and sending data via our RESTful APIs. Also, by doing this, we were able to clearly separate the inbound vs outbound data. We were able to quickly store raw inbound data in MongoDB and then parse and process that data in a meaningful way into PostgreSQL to easily access in our UI.")}
            </section>
          </section>
          <section className="mb-10">
            {this.makeHeader("2.3) React", "h2", "green")}
            {this.makeParagraph("The user interface is a single page application generated dynamically with React and React Router.")}
            {this.makeParagraph("The signed JWT, used for authorization, is stored in localhost and sent with every API request. Instead of using individually authorized Routes within the frontend app, a ProtectedRouter component first verifies the user is authenticated before allowing access to user-specific routes. This works around React Router’s limitation of not being able to use HOCs (Higher Order Components) inside a Switch. If a user cannot be authenticated, they are redirected to the homepage.")}
            {this.makeParagraph("User data retrieved from the database API endpoints is largely managed in the Dashboard component, where it is sorted and formatted for its child Chart and Project List components. The child components by contrast, either simply display the data they are given, or map that data to generate child components of their own.")}

            {this.makeImage("diagram_4.jpg", "a diagram", "Child components of the Dashboard are outlined in red")}
            {this.makeParagraph("This allows for seamless switching between weekly and daily chart views without fetching additional data.")}

            {this.makeImage("diagram_5.png", 'the daily dashboard', "The daily Dashboard display")}
            {this.makeParagraph("The Dashboard is flagged to re-fetch data whenever it is unmounted from the DOM. Components are reused to generate the ProjectList items, Linked Accounts list, and each External Account page. Chart.js is used to generate the Chart component, and all styling is done through the use of Tailwind CSS.")}
          </section>
        </div>
        <div className="bg-gray-200 p-10 flex shadow-inner flex-col justify-center items-center">
          {this.makeHeader("Ready to check it out?", "h2")}
          <button className="bg-gray-700 text-yellow-200 rounded-md shadow-2xl text-2xl p-4"
                  onClick={(e) => this.handleSampleUser(e)}>
            Try Sample User!
          </button>
        </div>
      </div>
    )

  }
}

export default WriteUp;