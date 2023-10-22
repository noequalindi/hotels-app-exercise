import React, { PureComponent } from 'react';

import './styles.scss';

class PaginationList extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            currentIndex: this.props.pageIndex
        }
    }

    paginationClicked = (index) => {
        const { onPageClick } = this.props;

        if (onPageClick) onPageClick(index);
    }

    _prev = () => {
        const { onPrev } = this.props;
        let { currentIndex } = this.state;

        currentIndex -= 1;
        if (currentIndex < 1) {
            currentIndex = 0;
        }

        this.setState({currentIndex: currentIndex});

        if (onPrev) onPrev(currentIndex);
    }

    _next = () => {
        const { pages, onNext } = this.props;
        let { currentIndex } = this.state;

        currentIndex += 1;
        if (currentIndex > pages) {
            currentIndex = pages;
        }

        this.setState({currentIndex: currentIndex});

        if (onNext) onNext(currentIndex);
    }

    renderPaginationLinks() {
        const { pages, pageIndex } = this.props;
        var pagesList = [...Array(pages).keys()].map(x => ++x);

        return pagesList.map((item, idx) => {
            return (
                <li key={idx} className="PaginationItem">
                <button className={"PaginationButton " + (item === pageIndex ? 'is-active' : '')} 
                    onClick={ () => this.paginationClicked(item)}>
                    {item}
                </button>
                </li>
            )
        });
    }

    render() {
        return (
            <div className="Pagination">
            <ul className="PaginationList">
                <li className="PaginationItem"><button className="PaginationButton" onClick={this._prev}>&#x2190;</button></li>
                { this.renderPaginationLinks() }
                <li className="PaginationItem"><button className="PaginationButton" onClick={this._next}>&#x2192;</button></li>
            </ul>
        </div>
        );
    }
}

export default PaginationList;