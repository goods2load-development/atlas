import React, { Component } from 'react';

import { Phone } from 'lucide-react';

type WhatsAppButtonProps = {
  phoneNumber: string; // приклад: "380961234567"
};

class WhatsAppButton extends Component<WhatsAppButtonProps> {
  handleClick = () => {
    const { phoneNumber } = this.props;
    const formatted = phoneNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${formatted}`;
    window.open(url, '_blank');
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="mt-5 bg-green-500 p-1.5 rounded-[48px] flex flex-row items-center gap-2"
      >
        <span className="border-2 border-white rounded-full grid place-content-center p-1.5">
          <Phone color="white" fill="white" />
        </span>
        <span className="bg-white text-black p-2 rounded-[48px]">
          Chat with them in one!
        </span>
      </button>
    );
  }
}

export { WhatsAppButton };
