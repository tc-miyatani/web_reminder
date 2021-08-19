import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components';

const Button = styled.div`
  display: none;
`;

class LineAddFriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.atLineId = `@${props.lineId}`;
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js';
    this.buttonRef.current.insertAdjacentElement('afterend', script);
  }

  render () {
    return (
      <React.Fragment>
        <Button ref={this.buttonRef} className="line-it-button"
                data-lang="ja" data-type="friend" data-lineid={this.atLineId}
        ></Button>
      </React.Fragment>
    );
  }
}

LineAddFriendButton.propTypes = {
  lineId: PropTypes.string
};
export default LineAddFriendButton
