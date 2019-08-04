import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import React from 'react';

type VoteButtonsComponentProps = {
    thumbUpCount: number,
    thumbDownCount: number,
    handleThumbUpClick: { (): void },
    handleThumbDownClick: { (): void }
}

export class VoteButtonsComponent extends React.Component<VoteButtonsComponentProps> {

    render() {
        const {thumbUpCount, thumbDownCount, handleThumbUpClick, handleThumbDownClick} = this.props;
        return (
            <div>
                <button type="button" className="btn btn-light" onClick={handleThumbUpClick}><FontAwesomeIcon
                    icon={faThumbsUp}/>{thumbUpCount}</button>
                <button type="button" className="btn btn-light" onClick={handleThumbDownClick}><FontAwesomeIcon
                    icon={faThumbsDown}/>{thumbDownCount}</button>
            </div>
        );
    }
}