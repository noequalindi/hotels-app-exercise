import React, { PureComponent } from 'react';
import FilterExpandable from '../FilterExpandable/FilterExpandable';

import '../../scss/Card.scss';
import '../../scss/utils.scss';

class FilterComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hotelName: '',
            isExpanded: false,
            stars: [
                { amount: -1, value: 'all', text: 'Todas las estrellas', checked: true },
                { amount: 5, value: 5, checked: false  },
                { amount: 4, value: 4, checked: false  },
                { amount: 3, value: 3, checked: false  },
                { amount: 2, value: 2, checked: false  },
                { amount: 1, value: 1, checked: false  }
            ]
        }
    }

    _handleSetHotel = (event) => {
        this.setState({hotelName: event.target.value});
    }

    _handleStarClick = (value) => {
        let clonedStars = this.state.stars.slice();

        if ('all' === value) {
            clonedStars[0].checked = true;
            clonedStars.forEach(item => {
                if ('all' !== item.value) {
                    item.checked = false;
                }
            });
        } else {
            clonedStars[0].checked = false;
            let clicked = clonedStars.filter(item => item.value === value);
            clicked[0].checked = !clicked[0].checked;

            let starArray = clonedStars.slice();
            starArray.splice(0, 1);

            let allUnchecked = starArray.every(item => {
                return 'all' !== item.value && !item.checked;
            });

            if (allUnchecked) {
                clonedStars[0].checked = true;
            }
        }

        this.setState({stars: clonedStars}, () => {
            this._handleOnSearch();
        });
    }

    _handleOnSearch = () => {
        const { onSearch } = this.props;

        let { stars, hotelName } = this.state;

        var checkedOnly = [];
        if (!stars[0].checked) {
            var starArray = stars.slice();
            starArray.splice(1, 0);
            checkedOnly = starArray
                        .filter(item => item.checked)
                        .map(item => item.value);
        }

        if (onSearch) onSearch(hotelName, checkedOnly);
    }

    toggleFilter = () => {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        const { stars, isExpanded } = this.state;
        return (
            <div className="Card">
                <div className="CardWrap CardTitleContainer v-bottomBorder">
                    <span className="CardTitle">Filtros</span>
                    <button className="CardMobileExpand" onClick={ this.toggleFilter }>
                    {
                            isExpanded ?
                            <span className="ExpandedIcon">▲</span>
                            :
                            <span className="ExpandedIcon">▼</span>
                    }
                    </button>
                </div>
                {
                    isExpanded &&
                    <div className="CardFilters-mobile">
                        <div className="CardWrap CardSection v-bottomBorder">
                            <FilterExpandable
                                title="Nombre de Hotel"
                                type="search"
                                withIcon={true}
                                stars={stars}
                                onSetHotel={this._handleSetHotel}
                                onSearch={this._handleOnSearch} />
                        </div>
                        <div className="CardWrap CardSection">
                            <FilterExpandable
                                title="Estrellas"
                                type="star"
                                withIcon={true}
                                stars={stars}
                                onStarClick={this._handleStarClick} />
                        </div>
                    </div>
                }

                <div className="CardFilters-desktop">
                    <div className="CardWrap CardSection v-bottomBorder">
                        <FilterExpandable
                            title="Nombre de Hotel"
                            type="search"
                            withIcon={true}
                            stars={stars}
                            onSetHotel={this._handleSetHotel}
                            onSearch={this._handleOnSearch} />
                    </div>
                    <div className="CardWrap CardSection">
                        <FilterExpandable
                            title="Estrellas"
                            type="star"
                            withIcon={true}
                            stars={stars}
                            onStarClick={this._handleStarClick} />
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterComponent;