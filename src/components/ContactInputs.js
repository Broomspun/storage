import React from 'react';
import InputMask from 'react-input-mask';

class ContactInputs extends React.Component {
    render() {
        const { handleAndValidateEmailAndPhone, handleAndValidateEmail, email, phone } = this.props;
        return (
            <React.Fragment>
                <label className="small-label">Email*</label>
                <input required type="email" id="email"
                value={email.value} className="form-control" placeholder="Email address - this quote will be sent to you"
                       onChange={handleAndValidateEmailAndPhone}
                       onBlur = {handleAndValidateEmail}
                />
                {email.msg}
                <br/>
                <label className="small-label" style={{ marginTop: '15px' }}>Phone*</label>
                {/*<input required type="tel" id="phone"*/}
                {/*value={phone.value}  className="form-control" placeholder="___-___-____" onChange={handleAndValidateEmailAndPhone}/>*/}
                <InputMask id="phone" required value = {phone.value}  onChange = {handleAndValidateEmailAndPhone} className="form-control" mask="999-999-9999" maskChar="_" placeholder="___-___-____" />
            </React.Fragment>
        )
    }
}

export default ContactInputs;
