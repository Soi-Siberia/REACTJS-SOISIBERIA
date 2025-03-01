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

        //Save to markdown table
        contentHTML : '',
        contentMarkdown : '',
        description: '',
        selectedOption: '',
        doctorId: '',
        specialtyId: '',
        clinicId:'',
        doctors: [],


        // save to doctor_infor Doctor
        listPrice: [],
        listPayment: [],
        listProvince: [],
        selectPrice: "",
        selectPayment: "",
        selectProvince: "",
        nameClinic: "",
        addressClinic: "",
        note: "",

    }}

  componentDidMount() {
        this.props.getAllDoctorRedux()
        this.props.fetchDoctorInforStart()
        
   }

   componentDidUpdate(prevPops, prevState,snapshot) {

        if(prevPops.allDoctorRedux !== this.props.allDoctorRedux)
        {
            let options = this.builDataInputSelect(this.props.allDoctorRedux, 'USER')
            // console.log("build data input select: ", options)
            this.setState({
                doctors: options,
            })
        }

        if(prevPops.doctorInfor !== this.props.doctorInfor)
        {
            let {resPrice, resPayment, resProvince} = this.props.doctorInfor
            let optionsPrice = this.builDataInputSelect(resPrice)
            let optionsPayment = this.builDataInputSelect(resPayment)
            let optionsProvince = this.builDataInputSelect(resProvince)

            this.setState({
                listPrice: optionsPrice,
                listPayment: optionsPayment,
                listProvince: optionsProvince,
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

  builDataInputSelect = (data, type) =>{
    console.log("DATA INPUT: ", data)
    return data?.map((item,index) => ({
        value: item.id,
        label: type === 'USER' ? `${item.lastName} ${item.firstName}` : item.valueVi
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
        let {doctors, listPrice, listPayment, listProvince} = this.state
        console.log("doctor infor: ",listPrice , listPayment, listProvince)

        return (
            <div className='Manager-Doctor-Container container'>

                <div className='Manager-Doctor-Title py-3'>
                    <h1>Tạo thêm thông tin bác sĩ </h1>
                </div>

                <div className='Manager-Doctor-info pb-3' >
                    <div className='Doctor-info-left'>
                        <label className='pb-2 fw-bold fs-4'>Chọn bác sĩ: </label>
                        <Select
                            placeholder = "Chọn bác sĩ"
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

                <div className='doctor-infor row'>
                    <div className='doctor-infor-extra col-4 mb-3'>
                        <label className='mb-2'>Chọn Giá</label>
                        {/* <input className='form-control'></input> */}
                        <Select
                            placeholder = "Chọn giá tiền"
                            // value={this.state.selectedOption}
                            onChange={this.handleChangePrice}
                            options={listPrice}
                        />
                    </div>
                    <div className='doctor-infor-extra col-4 mb-3'>
                        <label className='mb-2'>Chọn hình thức thanh toán</label>
                        <Select
                            // value={this.state.selectedOption}
                            placeholder = "Chọn hình thức thanh toán"
                            onChange={this.handleChangelistPayment}
                            options={listPayment}
                        />

                    </div>
                    <div className='doctor-infor-extra col-4 mb-3'>
                        <label className='mb-2'>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedOption}
                            placeholder = "Chọn thành tỉnh thành"
                            onChange={this.handleChangelistProvince}
                            options={listProvince}
                        />
                    </div>
                    <div className='doctor-infor-extra col-4 mb-4'>
                        <label className='mb-2'>Tên phòng khám</label>
                        <input className='form-control'></input>
                    </div>
                    <div className='doctor-infor-extra col-4 mb-4'>
                        <label className='mb-2'>Đại chỉ phòng khám</label>
                        <input className='form-control'></input>
                    </div>
                    <div className='doctor-infor-extra col-4 mb-4'>
                        <label className='mb-2'>Ghi chú</label>
                        <input className='form-control'></input>
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
        roleTimeDoctor: state.admin.roleTimeDoctor,
        doctorInfor: state.admin.doctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux : () => dispatch(actions.getAllDoctorStart()),
        createMarkDownStartRedux: (data) => dispatch(actions.createMarkDownStart(data)),
        fetchDoctorInforStart: () => dispatch(actions.fetchDoctorInforStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
