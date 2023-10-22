import React, { PureComponent } from 'react';

import './styles.scss';
import '../../scss/Button.scss';
import '../../scss/StarCheckbox.scss';

class FilterExpandable extends PureComponent {

    constructor(props) {
        super(props);

        this._handleOnPress = this._handleOnPress.bind(this);

        this.state = {
            isOpened: true
        }
    }

    _handleCheckPress = (value) => {
        const { onStarClick } = this.props;
        if (onStarClick) onStarClick(value);
    }

    _renderStarsStructure = () => {
        const { stars } = this.props;

        return stars.map((item, idx) => {
            return (
                <div key={idx} className="StarCheckBoxRow">
                    <input onChange={ () => this._handleCheckPress(item.value) } type="checkbox" value={item.value} checked={item.checked}/>
                    {
                        item.text &&
                        <span className="StarCheckValue">{item.text}</span>
                    }
                    {
                        item.amount !== -1 &&
                        Array(item.amount).fill('').map((val, idx) => {
                            return <span key={idx} className="StarIcon" />
                        })
                    }
                </div>
            );
        });
    }

    _handleOnPress() {
        const { onSearch } = this.props;
        if (onSearch) onSearch();
    }

    _onChange = (event) => {
        const { onSetHotel } = this.props;
        if (onSetHotel) onSetHotel(event);
    }


    _renderExpandableContentByType = () => {
        const {
            type,
        } = this.props;

        switch(type) {
            case 'search':
                return (
                    <div className="ExpandableItemRow">
                        <input id="ExpandableFilterInput" onChange={this._onChange } onKeyPress={ (event) => { if (event.key === "Enter") { this._handleOnPress()}}} className="ExpandableFilterInput" placeholder="Ingrese el nombre del Hotel" type="text" />
                        <button id="SearchButton" onClick={ this._handleOnPress } className="Button Button--primary">Aceptar</button>
                    </div>
                );
            case 'star':
                return (
                    <div className="StarCheckbox">
                        { this._renderStarsStructure() }
                    </div>
                );
            default:
                return null
        }
    }

    _toggleExpanded = () => {
        this.setState({isOpened: !this.state.isOpened});
    }

    _renderIcon = () => {
        const {
            type,
            withIcon
        } = this.props;

        if (withIcon) {
            return <span className={`ExpandableTitleIcon ${type}`}></span>
        }
    }

    render() {
        const {
            isOpened
        } = this.state;

        return (
            <div className="ExpandableContainer" >
                <div className="ExpandableTitleWrap">
                    <span className="ExpandableTitle">
                        { this._renderIcon() }
                        {this.props.title || 'Title'}
                    </span>
                    <button className="ExpandedArrowButton" onClick={this._toggleExpanded}>
                        {
                            isOpened ?
                            <span className="ExpandedIcon">▲</span>
                            :
                            <span className="ExpandedIcon">▼</span>
                        }
                    </button>
                </div>
                {
                    isOpened && this._renderExpandableContentByType()
                }
            </div>
        );
    }
}

export default FilterExpandable;