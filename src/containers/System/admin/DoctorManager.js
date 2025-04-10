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
import { CRUD_ACTIONS }from "../../../utils/constant"
import { isUndefined } from 'lodash';

import MutiSelect from '../../../components/Input/MutiSelect.js'

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
        hasOldData: true,
        opSpecialty: "",
        /******************************/


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
        specialtySeclected: "",

    }}

  componentDidMount() {
        this.props.getAllDoctorRedux()
        this.props.fetchDoctorInforStart()
        this.props.getAllSpecialtyStart()
        
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

        if(prevPops.detailtDoctor !== this.props.detailtDoctor)
            {
                // console.log("detail doctor: ", this.props.detailtDoctor.data)
            let { listPrice, listPayment, listProvince } = this.state;
            let detailData = this.props.detailtDoctor?.data;
            let markDown = Object.values(detailData.markDown).some(value => value !== null && value !== isUndefined)
            let doctorInfo = detailData?.doctor_infor;
            // console.log("Giá trị markdown: ", detailData.markDown)
            // console.log("markDown: ", markDown)
            let newState = {
                hasOldData: !markDown,
                description: detailData?.markDown?.description || "",
                contentMarkdown: detailData?.markDown?.contentMarkdown || "",
                contentHTML: detailData?.markDown?.contentHTML || "",
                selectPrice: listPrice.find(item => item.keyMap === doctorInfo?.priceId) || "",
                selectPayment: listPayment.find(item => item.keyMap === doctorInfo?.paymentId) || "",
                selectProvince: listProvince.find(item => item.keyMap === doctorInfo?.provinceId) || "",
                nameClinic: doctorInfo?.nameClinic || "",
                addressClinic: doctorInfo?.addressClinic || "",
                note: doctorInfo?.note || "",
            };
            
            this.setState(newState);
        }

        if(prevPops.doctorInfor !== this.props.doctorInfor)
        {
            let {resPrice, resPayment, resProvince} = this.props.doctorInfor
            // console.log("Data doctor info list: ",resPrice, resPayment, resProvince)
            let optionsPrice = this.builDataInputSelect(resPrice, "DoctorInforPrice")
            let optionsPayment = this.builDataInputSelect(resPayment, "DoctorInfor")
            let optionsProvince = this.builDataInputSelect(resProvince, "DoctorInfor")
            this.setState({
                listPrice: optionsPrice,
                listPayment: optionsPayment,
                listProvince: optionsProvince,
            })
        }

        if(prevPops.allSpecialty !== this.props.allSpecialty)
        {
            // console.log("all specialty: ", this.props.allSpecialty)
            let options = this.builDataInputSelect(this.props.allSpecialty, 'Specialty')
            // console.log("build data input select: ", options)
            this.setState({
                opSpecialty: options,
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
    
    this.props.getDetailDoctorByIdStart(selectedOption.value)
    
    this.setState({ selectedOption })
  }

  handleChangeTextarea = (event) => {
    this.setState({
        description: event.target.value
    })

  }

  builDataInputSelect = (data, type) =>{
    // console.log("DATA INPUT: ", data)
    if(type === 'USER')
    {
        return data?.map((item,index) => ({
            value: item.id,
            label: `${item.lastName} ${item.firstName}`
        })) || [];
    }
    if(type === 'DoctorInfor')
    {
        return data?.map((item,index) => ({
            value: item.keyMap,
            label: item.valueVi,
            keyMap: item.keyMap,
        })) || [];
    }

    if(type === 'DoctorInforPrice')
    {
        return data?.map((item,index) => ({
            value: item.keyMap,
            label: `${item.valueVi} vnđ`,
            keyMap: item.keyMap,
        })) || [];
    }
    if(type === 'Specialty')
    {
        return data?.map((item,index) => ({
            id: item.id,
            label: item.name,
        })) || [];
    }

  }

  handleChangeDoctorInfor = (selectedOption, name) =>{
    // console.log("selectedOption", selectedOption)
    let statename = name.name
    let coppyState = {...this.state}
    coppyState[statename] = selectedOption;
    this.setState({
        ...coppyState
    })
  }
  handleOnChangInput = (event) =>{
    let {name, value} = event.target
    // console.log("taget input: ", name, value)
    this.setState({
        [name]:value
    })
  }

  handeSetState = () =>{
    
    this.setState({
        selectedOption: "",
        hasOldData: true,
        description: "",
        contentMarkdown: "",
        contentHTML: "",
        selectPrice: "",
        selectPayment: "",
        selectProvince: "",
        nameClinic: "",
        addressClinic: "",
        note:"",
        specialtyDotor:""
    })
  }

  handleSpecialtySelected = (selelectDataChillSentParent) => {
    // console.log("Giá trị selelectDataChillSentParent: ", selelectDataChillSentParent)
    let specialtySeclected = selelectDataChillSentParent.map(item => item.id)
    // console.log("Giá trị specialtySeclected: ", specialtySeclected)
    this.setState({
        specialtySeclected: specialtySeclected
    })
  }

  SaveInforDoctor = async() => {
    let {contentHTML, contentMarkdown, description, selectedOption, hasOldData,
        selectPrice, selectPayment, selectProvince, nameClinic, addressClinic, note, specialtySeclected } = this.state
    let actions = hasOldData === true ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT

    // console.log("Data save: ", contentHTML, contentMarkdown, " + actions: ", actions)
    
    await this.props.createMarkDownStartRedux({
        contentHTML :contentHTML,
        contentMarkdown :contentMarkdown,
        description:description,
        doctorId:selectedOption.value,
        actions: actions,
        priceId: selectPrice.value,
        paymentId: selectPayment.value,
        provinceId: selectProvince.value,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note:note,
        specialtyDotor: specialtySeclected,

    })

    this.handeSetState()
  }


    render() {
        let {hasOldData, doctors, listPrice, listPayment, listProvince, selectPrice,selectPayment,
            selectProvince , contentMarkdown, description, nameClinic, addressClinic, note, opSpecialty, specialtySeclected} = this.state

        console.log("Giá trị specialtySeclected", specialtySeclected)
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

                        <label className='pb-2 fw-bold fs-4'>Chuyên khoa: </label>
                        <MutiSelect
                            placeholder = "Chọn chuyên khoa"
                            options={opSpecialty}
                            senData = {this.handleSpecialtySelected}
                            // name = "specialtyId" 
                            />

                    </div>
                    <div className='Doctor-info-right'>
                        <label className='pb-2 fw-bold fs-4'>Thông tin bác sĩ: </label>
                        <textarea
                            className='form-control'
                            value={description ?? ""}
                            rows={5} 
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
                            value={selectPrice}
                            onChange={this.handleChangeDoctorInfor}
                            name = "selectPrice"
                            options={listPrice}
                        />
                    </div>
                    <div className='doctor-infor-extra col-4 mb-3'>
                        <label className='mb-2'>Chọn hình thức thanh toán</label>
                        <Select
                            value={selectPayment}
                            placeholder = "Chọn hình thức thanh toán"
                            onChange={this.handleChangeDoctorInfor}
                            name = "selectPayment"
                            options={listPayment}
                        />

                    </div>
                    <div className='doctor-infor-extra col-4 mb-3'>
                        <label className='mb-2'>Chọn tỉnh thành</label>
                        <Select
                            value={selectProvince}
                            placeholder = "Chọn thành tỉnh thành"
                            onChange={this.handleChangeDoctorInfor}
                            name = "selectProvince"
                            options={listProvince}
                        />
                    </div>
                    <div className='doctor-infor-extra col-4 mb-4'>
                        <label className='mb-2'>Tên phòng khám</label>
                        <input 
                            value={nameClinic ?? ""}
                            className='form-control'
                            onChange={this.handleOnChangInput}
                            name = "nameClinic"
                        ></input>
                    </div>
                    <div className='doctor-infor-extra col-4 mb-4'>
                        <label className='mb-2'>Đại chỉ phòng khám</label>
                        <input 
                        value={addressClinic ?? ""}
                        className='form-control'
                        onChange={this.handleOnChangInput}
                        name = "addressClinic"
                        ></input>
                    </div>
                    <div className='doctor-infor-extra col-4 mb-4'>
                        <label className='mb-2'>Ghi chú</label>
                        <input
                            value={note ?? ""}
                            className='form-control'
                            onChange={this.handleOnChangInput}
                            name = "note"
                        ></input>
                    </div>
                </div>

                <div className='Manager-Doctor-Editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)}
                        value={contentMarkdown ?? ""}
                        onChange={this.handleEditorChange} 
                    />
                </div>


                <div className='Manager-Doctor-btn'>
                    <button 
                        className={hasOldData === true ? 'btn-Save btn btn-success my-3 px-2' : 'btn-Update btn btn-success my-3 px-2'}
                        onClick={()=> this.SaveInforDoctor()}>
                        {
                            hasOldData === true ? "Lưu thông tin" : "Cập nhật thông tin"
                        }
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
        doctorInfor: state.admin.doctorInfor,
        markdownDoctor: state.admin.markdownDoctor,
        detailtDoctor: state.doctor.detailDoctor,
        allSpecialty: state.doctor.allSpecialty,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux : () => dispatch(actions.getAllDoctorStart()),
        createMarkDownStartRedux: (data) => dispatch(actions.createMarkDownStart(data)),
        fetchDoctorInforStart: () => dispatch(actions.fetchDoctorInforStart()),
        getDetailDoctorByIdStart: (id) => dispatch(actions.getDetailDoctorByIdStart(id)),
        getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManager);
