import React, { Component } from 'react';

import { Phone } from 'lucide-react';

type WhatsAppButtonProps = {
  phoneNumber: string;
};

class WhatsAppButton extends Component<WhatsAppButtonProps> {
  handleClick = () => {
    const { phoneNumber } = this.props;
    const formatted = phoneNumber.replace(/[^0-9]/g, '');

    const message = `Hi Provider, I found you on Goods2Load and would like to know more about your services and how you can support my business. Thanks`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${formatted}?text=${encodedMessage}`;

    window.open(url, '_blank');
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="mt-5 bg-green-500 p-1.5 rounded-[48px] flex flex-row items-center gap-2 justify-between"
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
