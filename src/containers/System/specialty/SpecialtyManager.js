import React, { Component } from 'react';
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./SpecialtyManager.scss";

// import * as actions from "../../../store/actions";
import {CommonUtils} from '../../../utils'


/* markdowns */
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

/*end markdowns */

class SpecialtyManager extends Component {

    constructor(props){
        super(props);
        this.state = {
            HTML:"",
            markdown:"",
            name: "",
            mota: "",
            avatar: "",
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps){
    }

    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text)
        this.setState({
            HTML: html,
            markdown :text
        })
    }
    
    handleOnChangeInput = async (event, id) => {
        // console.log("Check input: ", event.target.value)
        // console.log("Check id: ", id)
        // console.log("Check file: ", event.target.files)
        let copyState = {...this.state};
        if(event.target.files && event.target.files.length > 0){
            let file = event.target.files[0];
            let converBase64 = await CommonUtils.getBase64(file)
            // console.log("converBase64 file: ", converBase64)
            copyState[id] = converBase64;
        }else{
            copyState[id] = event.target.value;
        }

        this.setState({
            ...copyState
        })
    }

    handleSaveNewSpecialty = () => {
        console.log("Check state: ", this.state)
    }

    render() {


        return (
            <>
                <div className="specialty-manager-container-full">

                    <div className='container'>
                        <div className="title text-center">Quản lý chuyên khoa</div>
                        <div className="specialty-manager-body row mt-3">
                            <div className="col-6 form-group">
                                <label>Tên chuyên khoa</label>
                                <input 
                                    type="text" 
                                    className="form-control mt-2" 
                                    placeholder="Tên chuyên khoa" 
                                    onChange={(event) => this.handleOnChangeInput(event, "name")}
                                />

                                <label className='pt-2'>Ảnh chuyên khoa</label>
                                <input 
                                    type="file" 
                                    className="form-control mt-2"
                                    onChange={(event) => this.handleOnChangeInput(event, "avatar")}
                                    
                                    />
                            </div>
                            <div className="col-6 form-group">
                                <label>Thông tin mô tả</label>
                                <textarea 
                                    className='form-control mt-2' 
                                    rows={4}
                                    onChange={(event) => this.handleOnChangeInput(event, "mota")}
                                    ></textarea>
                            </div>

                            <div className='col-12 specialty-markdown mt-4'>

                                <MdEditor 
                                    style={{ height: '300px' }} 
                                    renderHTML={text => mdParser.render(text)}
                                    // value={contentMarkdown ?? ""}
                                    onChange={this.handleEditorChange} 
                                />
                            </div>
                    
                            <div className="col-2 form-group mt-3 mb-3 btn-save">
                                <button 
                                    className="btn-themmoi"
                                    onClick={() => this.handleSaveNewSpecialty()}
                                    >Thêm mới</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManager);
