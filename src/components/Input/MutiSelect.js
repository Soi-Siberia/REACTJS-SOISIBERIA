import React from 'react';
import './MutiSelect.css';

class MutiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: props.value || [], // Khởi tạo từ prop value nếu có
      isOpen: false
    };
    this.containerRef = React.createRef();
  }
  /*example option use select:  
  
 options: [
        { id: '1', label: 'JavaScript' },
        { id: '2', label: 'TypeScript' },
        { id: '3', label: 'React' },
        { id: '4', label: 'Vue' },
        { id: '5', label: 'Angular' },
        { id: '6', label: 'Node.js' },
        { id: '7', label: 'Express' },
        { id: '8', label: 'MongoDB' },
        { id: '9', label: 'MySQL' },
        { id: '10', label: 'PostgreSQL' },
      ]
  
  */
  // Cập nhật selectedOptions khi nhận props mới
  componentDidUpdate(prevProps) {
    // Nếu prop value thay đổi từ component cha
    if (this.props.value && JSON.stringify(prevProps.value) !== JSON.stringify(this.props.value)) {
      this.setState({
        selectedOptions: this.props.value
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.containerRef.current && !this.containerRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
    this.props.senData(this.state.selectedOptions)
  };

  toggleDropdown = () => {
    this.props.senData(this.state.selectedOptions)
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleOptionClick = (option) => {
    this.setState(prevState => {
      // Kiểm tra xem option đã được chọn chưa
      const isSelected = prevState.selectedOptions.some(item => item.id === option.id);

      let newSelectedOptions;
      if (isSelected) {
        // Nếu đã chọn, loại bỏ khỏi danh sách đã chọn
        newSelectedOptions = prevState.selectedOptions.filter(item => item.id !== option.id);
      } else {
        // Nếu chưa chọn, thêm vào danh sách đã chọn
        newSelectedOptions = [...prevState.selectedOptions, option];
      }

      // Gọi hàm callback từ props để cập nhật state của component cha
      if (this.props.onChange) {
        this.props.onChange(newSelectedOptions);
      }

      return {
        selectedOptions: newSelectedOptions
      };
    });
  };

  handleSelectedOptionClick = (option, e) => {
    e.stopPropagation(); // Ngăn không cho dropdown đóng/mở khi click vào option đã chọn
    this.handleOptionClick(option);
  };

  render() {
    const { options, placeholder = "Chọn các tùy chọn..." } = this.props;
    const { selectedOptions, isOpen } = this.state;

    return (
      <div className="multi-select-container" ref={this.containerRef}>
        <div className="multi-select-input" onClick={this.toggleDropdown}>
          {selectedOptions.length > 0 ? (
            <div className="selected-options">
              {selectedOptions.map(option => (
                <span
                  key={option.id}
                  className="selected-option"
                  onClick={(e) => this.handleSelectedOptionClick(option, e)}
                >
                  {option.label}
                </span>
              ))}
            </div>
          ) : (
            <div className="placeholder">{placeholder}</div>
          )}
          <div className="arrow">{isOpen ? '▲' : '▼'}</div>
        </div>

        {isOpen && (
          <div className="options-dropdown">
            {options.map(option => (
              <div
                key={option.id}
                className={`option ${selectedOptions.some(item => item.id === option.id) ? 'selected' : ''}`}
                onClick={() => this.handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}

        {/* {selectedOptions.length > 0 && (
          <div className="selected-values">
            <strong>Đã chọn:</strong> {selectedOptions.map(option => option.label).join(', ')}
          </div>
        )} */}
      </div>
    );
  }
}

export default MutiSelect;
