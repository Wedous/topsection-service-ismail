import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import CourseHeader from './components/CourseHeader';
import NavBar from './components/NavBar';

const styles = {
  pageContainerStyle: {},
  breadcrumbStyle: {
    marginTop: '1%',
    paddingLeft: '4%',
    marginBottom: '1%',
    width: '100%',
    paddingTop: '3px',
    paddingBottom: '3px',
  },
  crumbStyle: { marginLeft: '1%', marginRight: '1%' },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
    };
  }

  componentDidMount() {
    const courseId = Math.floor(Math.random() * 10000000);
    fetch(`/course/${courseId}`)
      .then(raw => raw.json())
      .then((courseData) => {
        this.setState({ course: courseData.rows[0] });
      });
  }

  render() {
    const { course } = this.state;
    return (
      <div style={styles.pageContainerStyle}>
        <NavBar />
        <Breadcrumb style={styles.breadcrumbStyle} size='small'>
          <Breadcrumb.Section style={styles.crumbStyle}>{'Business'}</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section style={styles.crumbStyle}>{'Entrepreneurship'}</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active style={styles.crumbStyle}>{'One Day MVP'}</Breadcrumb.Section>
        </Breadcrumb>
        <CourseHeader courseData={course} />
      </div>
    );
  }
}

export default App;
