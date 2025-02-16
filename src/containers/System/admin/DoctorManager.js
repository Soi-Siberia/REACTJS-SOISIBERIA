import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';
import './DoctorManager.scss';

import * as actions from '../../../store/actions'

/**Macdow Edit */
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);
/**--------------------------------------------------------- */

class DoctorManager extends Component {

   constructor (props) {
    super(props)
    this.state = {
        contentHTML : '',
        contentMarkdown : '',
        description: '',
        selectedOption: '',
        doctorId: '',
        specialtyId: '',
        clinicId:'',
        doctors: [],

    }}

  componentDidMount() {
        this.props.getAllDoctorRedux()
        
   }

   componentDidUpdate(prevPops, prevState,snapshot) {

        if(prevPops.allDoctorRedux !== this.props.allDoctorRedux)
        {
            let options = this.optionSelectDoctor(this.props.allDoctorRedux)
            this.setState({
                doctors: options,
            })
        }

   }


   handleEditorChange = ({ html, text }) => {
    // console.log('handleEditorChange', html, text)
    this.setState({
        contentHTML: html,
        contentMarkdown :text
    })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }
    //     , () =>
    //   console.log(`Option selected:`, this.state.selectedOption)
    );
  }

  handleChangeTextarea = (event) => {
    // console.log("Text area ong chang: ",event.target.value)
    this.setState({
        description: event.target.value
    })

  }

  optionSelectDoctor = (data) =>{
    return data?.map((item,index) => ({
        value: item.id,
        label: `${item.lastName} ${item.firstName}`
    })) || [];
  }

  SaveInforDoctor = () => {
    // console.log("Data sent create markdown: ", this.state)
    this.props.createMarkDownStartRedux({

        contentHTML : this.state.contentHTML,
        contentMarkdown : this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedOption.value,

    })
  }


    render() {
        // console.log("data ALL Doctor redux: ", this.state.doctors)
        let {doctors} = this.state

        return (
            <div className='Manager-Doctor-Container container'>

                <div className='Manager-Doctor-Title py-3'>
                    <h1>Tạo thêm thông tin bác sĩ </h1>
                </div>

                <div className='Manager-Doctor-info pb-3' >
                    <div className='Doctor-info-left'>
                        <label className='pb-2 fw-bold fs-4'>Chọn bác sĩ: </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={doctors}
                        />
                    </div>
                    <div className='Doctor-info-right'>
                        <label className='pb-2 fw-bold fs-4'>Thông tin bác sĩ: </label>
                        <textarea
                            className='form-control' 
                            rows={4} 
                            placeholder='Mô tả bác sĩ...'
                            onChange={this.handleChangeTextarea}>
                            
                        </textarea>
                    </div>
                </div>

                <div className='Manager-Doctor-Editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} 
                    />
                </div>

                <div className='Manager-Doctor-btn'>
                    <button 
                        className='btn-Save btn btn-success my-3 px-2'
                        onClick={()=> this.SaveInforDoctor()}
                    >
                        Lưu Thông Tin
                    </button>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctorRedux: state.admin.dataAllDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux : () => dispatch(actions.getAllDoctorStart()),
        createMarkDownStartRedux: (data) => dispatch(actions.createMarkDownStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
