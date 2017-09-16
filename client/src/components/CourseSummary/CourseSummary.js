import React, { Component } from 'react';
import FaStar from 'react-icons/lib/fa/star';
import FaCircle from 'react-icons/lib/fa/circle';
import CourseRating from '../CourseRating/CourseRating';
import TimeAgo from '../TimeAgo/TimeAgo';
import './CourseSummary.css';

class CourseSummary extends Component {
  render() {
    const user = this.props.user;
    const now = this.props.now;
    const semesterLookup = this.props.semesterLookup;
    const distributionLookup = this.props.distributionLookup;
    const pdfLookup = this.props.pdfLookup;
    const auditLookup = this.props.auditLookup;
    const course = this.props.course;
    const showInstructors = this.props.showInstructors;
    const showStrictRatings = this.props.showStrictRatings;
    const showSemester = this.props.showSemester;

    let saved = false;
    for (let i = 0; i < user.savedCourses.length; i++) {
      saved |= user.savedCourses[i]._id === course._id;
    }

    return (
      <div className="CourseSummary">
        <div className="CourseSummary-top">
          <span className="CourseSummary-listing">
            {showInstructors
              ? semesterLookup[course.semester].name
              : course.department + course.catalogNumber}
          </span>
          {!showInstructors &&
          course.crossListings &&
          course.crossListings.length
            ? <span className="CourseSummary-crosslistings">
                {course.crossListings.map(crossListing =>
                  <span
                    key={crossListing.department}
                    className="CourseSummary-crosslisting"
                  >
                    {'/ ' +
                      crossListing.department +
                      crossListing.catalogNumber}
                  </span>
                )}
              </span>
            : null}
          {course.distribution
            ? <span
                className="CourseSummary-distribution"
                title={distributionLookup[course.distribution]}
              >
                {course.distribution}
              </span>
            : null}
          {course.pdf
            ? <span
                className={'CourseSummary-' + course.pdf.toLowerCase()}
                title={pdfLookup[course.pdf]}
              >
                {course.pdf}
              </span>
            : null}
          {course.audit
            ? <span
                className={'CourseSummary-' + course.audit.toLowerCase()}
                title={auditLookup[course.audit]}
              >
                {course.audit.slice(0, -4)}
              </span>
            : null}
          <span className="CourseSummary-stretch" />
          {showSemester
            ? <span className="CourseSummary-semester">
                {semesterLookup[course.semester].name}
              </span>
            : null}
          {saved
            ? <span className="CourseSummary-saved" title="Saved course">
                <FaStar />
              </span>
            : null}
        </div>
        <div className="CourseSummary-middle">
          <span className="CourseSummary-title">
            {showInstructors
              ? course.instructors
                  .map(instructor => instructor.fullName)
                  .join(', ')
              : course.title}
          </span>
        </div>
        <div className="CourseSummary-bottom">
          <CourseRating
            score={
              course.rating &&
              (!showStrictRatings || course.rating.semester === course.semester)
                ? course.rating.score
                : null
            }
            new={course.new}
            description={
              course.rating &&
              (!showStrictRatings || course.rating.semester === course.semester)
                ? course.rating.description
                : null
            }
          />
          <span className="CourseSummary-stretch" />
          <TimeAgo now={now} then={new Date(course.lastModified)} />
          <span
            className={
              'CourseSummary-status CourseSummary-status-' +
              course.status.toLowerCase()
            }
            title={course.status}
          >
            {course.status === 'Open' ? null : <FaCircle />}
          </span>
          <span className="CourseSummary-seats">
            {(course.seatsTaken >= 0 ? course.seatsTaken : '\u2013') +
              ' / ' +
              (course.seatsTotal >= 0 ? course.seatsTotal : '\u2013')}
          </span>
        </div>
      </div>
    );
  }
}

export default CourseSummary;
