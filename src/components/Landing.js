import React from 'react';
import NonAuthNav from './common/NonAuthNav';
import Auth from './auth/Auth';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  componentDidMount() {
    Auth.refreshDB();
  }

  makeImage(src, alt, caption) {
    return (
      <figure className={`flex flex-col gap-2 shadow-inner items-center justify-center my-10 bg-gradient-to-b from-green-300 via-yellow-200 to-red-100 rounded-md p-8 ${caption ? "pt-2" : ""}`}>
        <figcaption className="text-center text-md text-gray-800 font-medium self-center">{caption}</figcaption>
        <img className="rounded-lg shadow-xl"
          src={`${process.env.PUBLIC_URL}/images/landing/${src}`}
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
      <div className="h-100 text-gray-700 text-center bg-gradient-to-b from-gray-100 to-white">
        <NonAuthNav/>
        <div className="pt-10 max-w-2xl flex-col justify-center mx-auto">
        <img className="p-6 mx-auto"
             src={`${process.env.PUBLIC_URL}/images/logos/timehub_color_logo.svg`}
             alt="timehub logo">
         </img>
        <h1 className="text-center">A central hub for your tracked time</h1>
        {this.makeImage("graphic_1.svg", "a graph of timehub's conveniences")}
        <p>Timehub allows you to sync your time tracking data from Harvest, Clockify, and Toggl so that you can finally just go to one spot to view all your time tracking data.</p>
        {this.makeImage("graphic_2.svg", "a graph showing the source of your data")}
        <p>Not only does it get all your time tracking data, but it also normalizes all of your data so that you can easily see your data for the day or week in beautiful visuals.</p>
        <p className="mt-10">These visuals automatically stay up-to-date as new data is added to the various time tracking apps you usually use.</p>
        {this.makeImage("graphic_3.png", "weekly data view", "Week View")}
        {this.makeImage("graphic_4.png", "daily data view", "Day View")}
        <p className="text-center">Viewing your time tracking data has never been so easy!</p>
        </div>
        <h2 className="my-10 font-medium text-xl pb-20">For more technical details on how Timehub was built and works, please see our <Link to="/writeup"className="underline text-blue-400">Case Study</Link></h2>
      </div>
    )

  }
}

export default Landing;