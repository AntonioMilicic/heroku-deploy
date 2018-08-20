import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  setSelection,
  fetchLessons,
  fetchCourses,
  setSelectedLessonsIDs
} from '..//redux/actions/topicsActions';

class Topics extends React.Component {
  async openCurses(topicId) {
    const { dispatch } = this.props;
    await dispatch(fetchCourses(topicId));
    await dispatch(setSelection('courses'));
  }

  async openLessons(courseId) {
    const { dispatch } = this.props;
    await dispatch(fetchLessons(courseId));
    await dispatch(setSelection('lessons'));
  }

  backSelection() {
    const { dispatch, selection } = this.props;
    if (selection === 'courses') dispatch(setSelection('topics'));
    else if (selection === 'lessons') {
      dispatch(setSelection('courses'));
      dispatch(setSelectedLessonsIDs([]));
    }
  }

  selectLessons(lessonId) {
    const { dispatch, selectedLessonsIDs } = this.props;
    const selected = Object.assign([], selectedLessonsIDs);
    const index = selected.indexOf(lessonId);
    if (index === -1) {
      selected.push(lessonId);
    } else {
      selected.splice(index, 1);
    }
    dispatch(setSelectedLessonsIDs(selected));
  }

  async startQuiz() {
    const { dispatch } = this.props;
    await dispatch(setSelection('quiz'));
  }

  render() {
    const user = this.props.user;
    if (user === undefined || isEmpty(user)) {
      return (
        <div>You have to log in to play!</div>
      );
    }

    let selectionCards = [];

    if (this.props.selection === 'topics' && this.props.topics) {
      selectionCards = this.props.topics.map((topic) =>
        <li
          key={topic.id}
          className='selection-card'
          onClick={() => this.openCurses(topic.id)}>
          <button type="button">{topic.title}</button>
        </li>
      );
    } else if (this.props.selection === 'courses' && this.props.courses) {
      selectionCards = this.props.courses.map((course) =>
        <li
          key={course.id}
          className='selection-card'
          onClick={() => this.openLessons(course.id)}>
          <button type="button">{course.title}</button>
        </li>
      );
    } else if (this.props.selection === 'lessons' && this.props.lessons) {
      selectionCards = this.props.lessons.map((lesson) =>
        <li
          key={lesson.id}
          className={'selection-card' +
            (
              this.props.selectedLessonsIDs.includes(lesson.id)
                ? ' selection-card-selected'
                : ''
            )
          }
          onClick={() => this.selectLessons(lesson.id)}>
          <button type="button">{lesson.title}</button>
        </li>
      );
    }

    return (
      <div className="topicsContainer">
        <h3>Select your <span>{this.props.selection.slice(0, -1)}</span></h3>

        {selectionCards.length > 0 ? <ul>{selectionCards}</ul> : null}
        {selectionCards.length === 0 ? <p>Selection is empty</p> : null}

        {
          (this.props.selection === 'courses' ||
            this.props.selection === 'lessons')
            ? (
              <button
                type="button"
                onClick={() => this.backSelection()}
              >Back</button>
            )
            : null
        }

        {
          this.props.selection === 'lessons'
            ? (
              <button
                type="button"
                onClick={() => this.startQuiz()}
                disabled={this.props.selectedLessonsIDs.length === 0}
              >Lets get it on!</button>
            )
            : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const {
    topics,
    courses,
    lessons,
    selection,
    selectedLessonsIDs
  } = state.topics;
  return {
    user,
    topics,
    courses,
    lessons,
    selection,
    selectedLessonsIDs
  };
}

Topics.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  topics: PropTypes.array,
  courses: PropTypes.array,
  lessons: PropTypes.array,
  selectedLessonsIDs: PropTypes.array,
  selection: PropTypes.string
};

export default connect(mapStateToProps)(Topics);
