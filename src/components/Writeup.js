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
              {this.makeParagraph(`The Rails API is the interface between the normalised data and the React app. It uses access tokens to extract user data from third-party APIs.`)}
              {this.makeParagraph('The Rails app then standardizes and loads this data to 2 databases — a MongoDB and PostgreSQL database. The app programmatically updates user data through cron and Active jobs.')}
              {this.makeImage('diagram_1.png', "a diagram")}
              {this.makeParagraph(`On the front-end, data access is authorized through the use of a JSON web token (JWT).
                When data is requested by the React app, authentication is first asserted by the server before a JSON payload is sent as response.
                This JSON data is used to update the display in the dashboard, which is made with React, Tailwinds, and Chart.js.`)}
              {this.makeImage('diagram_2.png', "a diagram", "From ETL to dashboard")}
            </section>
            <section>
              {this.makeHeader("2.2) Processing and Normalizing Data", "h3", "green")}
              {this.makeParagraph("After fetching the data from the third-party time trackers, the Rails API normalizes it into a shared format.")}
              <p></p>
              {this.makeImage('diagram_3.png', "a diagram", "The ERD")}
              {this.makeHeader("To implement this we had to answer some questions of the ETL process:", "h5")}
              <ul className="font-semibold flex">
                <li className="flex-1 px-2 py-4 text-center bg-red-100">How could we fetch a user’s data while avoiding the transfer of unnecessary data?</li>
                <li className="flex-1 px-2 py-4 text-center bg-yellow-100">How could we avoid requests taking a long time and (possibly) leading to HTTP timeouts?</li>
                <li className="flex-1 px-2 py-4 text-center bg-green-100">How could we avoid losing user’s data due to problems in an adapter’s logic (for example, if one of the services’ APIs change)?</li>
              </ul>
            </section>
            <section>
              {this.makeParagraph("The first 2 problems were partially solved by using the pagination features built-in to the external APIs we were consuming.")}
              {this.makeParagraph("Pagination limits the amount of data returned by an API, thereby potentially reducing the amount of data that’s being transferred and time taken for the response. The trade-off of using pagination is potentially not getting all of a user’s information. While this isn’t ideal, it’s acceptable because we aren’t building a production app for real users.")}
              {this.makeParagraph("A second decision that helped prevent data loss was to dump requested data into a MongoDB document store.")}
              {this.makeParagraph("Dumping requested raw data into a document store gave us more control over our data and decoupled the data’s extraction from its processing. Regardless of how our data was handled in our app, we had the certainty of having the raw data in Mongo. This came at the expense of having a second database and making the database insertions before data was processed.")}
              {this.makeParagraph("We still used a second, relational database. After the data was dumped into MongoDB, we processed the data in-memory into a normalized format and inserted it into our PostgreSQL database (which we chose because we were deploying on Heroku). Using a relational database for persistent storage gave us the advantage of more reliably and predictably storing and sending data via our RESTful APIs.")}
            </section>
          </section>
          <section className="mb-10">
            {this.makeHeader("2.3) React", "h2", "green")}
            {this.makeParagraph("The user interface is a single page application generated dynamically with React and React Router.")}
            {this.makeParagraph("The JWT used for authorization is stored in a private variable generated at runtime within the app. This decision, while it does not allow for a user’s session to persist across page reloads, was deemed an acceptable security solution to avoid the XXS and CSRF attack vulnerabilities inherent in storing sensitive data in local storage or cookies. Given Timehub was created primarily as an educational exercise, we optimized for data security over a user’s experience.")}
            {this.makeParagraph("Instead of using individually authorized Routes within the app, a ProtectedRouter component first verifies the user is authenticated before allowing access to user-specific routes. This works around React Router’s limitation of not being able to use HOCs (Higher Order Components) inside a Switch. If a user cannot be authenticated, they are redirected to the homepage.")}
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