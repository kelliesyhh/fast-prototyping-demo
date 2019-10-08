import React from 'react';
import './SpeechData.css';
import axios from 'axios';
import {
  Icon,
  Input,
  Button,
  Row,
  Col,
  Alert,
  Select,
  Spin,
  Popconfirm,
} from 'antd';
import {TableComponent} from './SpeechTable.js';
import {FancyBorder} from './FancyBorder.js';
import {TextFormat} from './TextFormat.js';
import ReactAudioPlayer from 'react-audio-player';
import mp3_file1 from './audios/bang.mp3';
import mp3_file2 from './audios/bloop.mp3';
import mp3_file3 from './audios/click.mp3';
import mp3_file4 from './audios/zang.mp3';
import mp3_file5 from './audios/dolbyatmos.mp3';

let FLASK_URL = 'http://127.0.0.1:8000';

const {Option} = Select;
const {TextArea} = Input;
const antIcon = <Icon type="loading" style={{fontSize: 40}} spin />;

class SpeechData extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      dialogue: '',
      dialogueArr: [],
      hasStartedTimeOut: false,
      returnedTable: [],
      showTable: false,
      canProcessAudio: false,
      symptomArray: [],
      noSymptomArray: [],
      audioSource: props.audioSource,
      btnDisabled: false,
      isLoading: false,
    };
  }

  render () {
    const showTable = this.state.showTable;
    let TableVisibility, reactAudioPlayer, alertStatus, sentenceVisibility;
    const canProcessAudio = this.state.canProcessAudio;
    let source = this.state.audioSource;
    const isLoading = this.state.isLoading;

    alertStatus = (
      <div>
        <Alert message={'Status: Dialogue Not Received'} type="error" />
      </div>
    );

    if (showTable === true) {
      alertStatus = (
        <div>
          <Alert
            message={'Status: Scroll down to see output table'}
            type="success"
          />
        </div>
      );
      TableVisibility = (
        <FancyBorder color="white">
          <TableComponent
            symptomArray={this.state.symptomArray}
            noSymptomArray={this.state.noSymptomArray}
          />
        </FancyBorder>
      );
    } else {
      if (isLoading === true)
        TableVisibility = (
          <FancyBorder color="white">
            <div>
              <Spin indicator={antIcon}>
                <Alert
                  message="Response is loading..."
                  description="Please wait for around 5 seconds to load full results"
                  type="info"
                />
              </Spin>
            </div>
          </FancyBorder>
        );
    }

    if (canProcessAudio) {
    } // if process button is clicked
    let sourceImport;
    switch (source) {
      case '1':
        sourceImport = mp3_file1;
        break;
      case '2':
        sourceImport = mp3_file2;
        break;
      case '3':
        sourceImport = mp3_file3;
        break;
      case '4':
        sourceImport = mp3_file4;
        break;
      case '5':
        sourceImport = mp3_file5;
        break;
      default:
        //sourceImport = ogg_file;
        break;
    }

    reactAudioPlayer = (
      <div className="reactAudioPlayer	">
        <ReactAudioPlayer src={sourceImport} controls />
      </div>
    );

    sentenceVisibility = (
      <div className="sentence">
        <TextFormat normalText={this.state.sentence} />
      </div>
    );

    return (
      <div className="grid-container">
        <div className="topHeader">
          <FancyBorder color="white">
            <TextFormat header2="Speech Data" />
          </FancyBorder>
        </div>

        <div className="dialogueForm">
          <FancyBorder color="white">
            <Row type="flex">
              <TextFormat header3="Dialogue" />
            </Row>
            <p />
            <Row type="flex">
              <TextArea
                name="dialogue"
                placeholder="Enter Dialogue"
                onChange={this.handleChange}
                autosize={{minRows: 12, maxRows: 25}}
                value={this.state.dialogue}
              />
            </Row>
          </FancyBorder>
        </div>
        <br /><br />
        <div className="callFlask">
          <FancyBorder color="white">
            <Row type="flex">
              <p />
              <Col span={3}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  disabled={this.state.btnDisabled}
                  icon="cloud-upload"
                >
                  Submit
                </Button>
              </Col>
              <Col span={3}>
                <Popconfirm
                  title="Are you sure you want to clear all dialogue entered?"
                  onConfirm={this.handleClear}
                  icon={
                    <Icon
                      type="exclamation-circle"
                      theme="filled"
                      style={{color: 'red'}}
                    />
                  }
                >
                  <Button type="danger" icon="delete">
                    Clear
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </FancyBorder>
        </div>
        <br /><br />
        <div className="searchQuery">
          <FancyBorder color="white">
            <Row type="flex">
              <TextFormat header3="Search" />
            </Row><p />
            <Row type="flex">
              <TextArea
                name="search"
                placeholder="Enter Search Query"
                onChange={this.handleSearch}
                value={this.state.search}
              />
            </Row>
            <br />
            <Col span={3}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSearchFunction}
                icon="search"
              >
                Search
              </Button>
            </Col>
            <br /><br />
            <Row type="flex">
              <TextFormat normalText="Sentence: " />{sentenceVisibility}
            </Row>
          </FancyBorder>
        </div>
        <br /><br />
        <div className="audioPlayer">
          <FancyBorder color="white">
            <Row type="flex">
              <Col span={8}>
                <TextFormat header3="Select Menu for Audio Examples" /> <p />
              </Col>
              <Col span={8}>
                <TextFormat header3="Play the File" /> <p />
              </Col>
              <Col span={8}>
                <TextFormat header3="Process and Output" /> <p />
              </Col>
            </Row>
            <Row type="flex">
              <Col span={8}>
                <Select
                  style={{width: 200}}
                  placeholder="Example Placeholder"
                  onChange={this.handleDropdown}
                >
                  <Option value="1">Option 1 (Bang)</Option>
                  <Option value="2">Option 2 (Bloop)</Option>
                  <Option value="3">Option 3 (Click)</Option>
                  <Option value="4">Option 4 (Zang)</Option>
                  <Option value="5">Option 5 (Dolby Atmos)</Option>
                </Select>
              </Col>
              <Col span={8}>
                {reactAudioPlayer}
              </Col>
              <Col span={8}>
                <Button
                  onClick={this.handleProcess}
                  style={{marginRight: 15}}
                  type="primary"
                  icon="tool"
                >
                  Process
                </Button>
              </Col>
            </Row>
          </FancyBorder>
        </div>
        <div className="testTable">{TableVisibility}</div>
        <div className="credits">
          <FancyBorder color="white">
            <TextFormat credits="© Kellie Sim 2019 | Made with React and Flask" />
          </FancyBorder>
        </div>
      </div>
    );
  }

  // handle Flask post and get
  handleFlask = dialogue => {
    let symptomArray = [], noSymptomArray = [];
    axios
      .post (FLASK_URL + '/postToFlask', {dialogue})
      .then (function (response) {
        console.log ('Response: ' + JSON.stringify (response.data));
        console.log (response.data);
        axios
          .get (FLASK_URL + '/getResponse')
          .then (function (response) {
            console.log ('Flask Returns R: ' + JSON.stringify (response.data));
            let responseArr = response.data;
            responseArr.map (_item => {
              if (typeof _item.symptom === 'undefined') {
                //runs if nosymptom is true
                noSymptomArray.push (_item);
              } else {
                symptomArray.push (_item);
              }
            });
          })
          .catch (function (error) {
            console.log ('Flask Returns E: ' + error);
          });
      })
      .catch (function (error) {
        console.log ('Error: ' + error);
      });
    this.setState ({symptomArray: symptomArray});
    this.setState ({noSymptomArray: noSymptomArray});
  };

  // handle change in dialogue textarea and state
  handleChange = ({target}) => {
    this.setState ({dialogue: target.value}, () => this.logFields ());
  };

  // print/log dialogue textarea value after setting state
  logFields = () => {
    const {dialogue} = this.state;
    console.log ('Dialogue: ', `${dialogue}`);
  };

  // handle submit button
  handleSubmit = () => {
    const {dialogue} = this.state;
    console.log (`${dialogue}`);
    this.handleFlask (`${dialogue}`);
    this.setState ({isLoading: true});
    var millisecondsToWait = 3000;
    setTimeout (() => {
      // Whatever you want to do after the wait
      this.setState ({hasStartedTimeOut: true});
      // let hasStartedTimeOut = this.state.hasStartedTimeOut;
      // console.log ('hasStartedTimeOut: ' + hasStartedTimeOut);
      this.setState ({showTable: true});
    }, millisecondsToWait);
    this.setState ({btnDisabled: true});
  };

  // clear dialogue button
  handleClear = () => {
    this.setState ({dialogue: ''});
    this.setState ({btnDisabled: false});
    this.setState ({showTable: false});
    this.setState ({isLoading: false});
  };

  // process audio files button
  handleProcess = () => {
    this.setState ({canProcessAudio: true});
    // insert code used to process audio
  };

  // dropdown menu to choose audio source
  handleDropdown = value => {
    // props = key from dropdown menu
    let source = value;
    console.log (value);
    this.setState ({audioSource: source});
  };

  // handle change in search field
  handleSearch = ({target}) => {
    this.setState ({search: target.value}, () => this.logSearch ());
  };

  // print/log search textarea value after setting state
  logSearch = () => {
    const {search} = this.state;
    console.log ('Search for: ', `${search}`);
  };

  // handle search button
  handleSearchFunction = () => {
    let sentence = '';
    let search = this.state.search;
    axios
      .post (FLASK_URL + '/postSearch', {search})
      .then (function (response) {
        console.log ('Response: ' + JSON.stringify (response.data));
        console.log (response.data);
        axios
          .get (FLASK_URL + '/getSearch')
          .then (function (response) {
            console.log (
              'getSearch Returns R: ' + JSON.stringify (response.data)
            );
            let res = response.data;
            sentence = res;
          })
          .catch (function (error) {
            console.log ('getSearch Returns E: ' + error);
          });
      })
      .catch (function (error) {
        console.log ('Error: ' + error);
      });
    var millisecondsToWait = 3000;
    setTimeout (() => {
      // Whatever you want to do after the wait
      this.setState ({sentence: sentence});
    }, millisecondsToWait);
  };
}
export default SpeechData;
