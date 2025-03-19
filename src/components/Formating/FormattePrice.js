import React, { Component } from "react";

/** Component hiển thị số tiền với định dạng tiền tệ Việt Nam */
class FormattedPrice extends Component {
    render() {
        const { value, currency = "VND", ...otherProps } = this.props;
        if (value == null) return null;

        const formattedValue = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: currency,
        }).format(value);

        return <span {...otherProps}>{formattedValue}</span>;
    }
}

export default FormattedPrice;
