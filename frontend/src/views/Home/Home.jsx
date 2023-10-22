import React, { Component } from 'react';
import noResults from '../../assets/images/no-results-marker.svg';
import logo from '../../assets/images/almundo.png';
import '../Home/styles.scss';
import HotelsList from '../../components/HotelsList/HotelsList';
import FilterComponent from '../../components/Filter/FilterComponent';
import ComponentServices from '../../services/ComponentServices'
import * as Constants from '../../utils/constants.js'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentAppState: 1,
            dataHotels: [],
            hotelName: '',
            stars: [],
            pages: null,
            pageIndex: 1,
        }

    }

    componentDidMount() {
        this.searchHotel();
    }

    _setNoResults = () => {
        this.setState({
            loading: false,
            currentAppState: 0
        });
    }

    searchHotel() {
        const { hotelName, stars, pageIndex } = this.state;
        this.setState({loading: true}, () => {
            ComponentServices.getHotels(hotelName, stars, pageIndex).then( response => {
                if (response.data.result && response.data.result.length > 0) {
                    this.setState({
                        loading: false,
                        currentAppState: 1,
                        dataHotels: response.data.result,
                        pages: response.data.pageCount,
                        pageIndex: response.data.page
                    });
                } else {
                    this._setNoResults();
                }
            }).catch( err => {
                this._setNoResults();
                console.log("There was an error " + err)
            });
        });
    }

    search = (hotelName, stars) => {
        this.setState({ hotelName: hotelName, stars: stars, pageIndex: 1 }, () => {
            this.searchHotel();
        });
    }

    _handlePageClicked = (pageIndex) => {
        this.setState({pageIndex: pageIndex}, () => {
            this.searchHotel();
        });
    }

    _handleIndexChange = (index) => {
        this.setState({pageIndex: index}, () => {
            this.searchHotel();
        });
    }

    render() {
        const { dataHotels, currentAppState, loading, pages, pageIndex } = this.state
        return (
            <React.Fragment>
                <header className="Header">
                    <div className="">
                    <div className="row">
                        <div className="twelve columns">
                            <img className="Header-logo" alt="logoBrand" src={`${Constants.IMAGES_URL}/logo-almundo.svg`} />
                        </div>
                    </div>
                    </div>
                </header>
                <div className="Body">
                    <div className="">
                        <div className="row" data-testid="allComponents">
                            <div className="four columns" data-testid="filterContainer">
                                <FilterComponent onSearch={this.search} />
                            </div>
                            <div className="eight columns v-positionRelative">
                                {
                                    loading &&
                                    <div className="Loader-Container">
                                        <div className="Loader-Overlay"></div>
                                        <div className="Loader">
                                            <img alt="logo" src={logo} className="Logo" />
                                            <span className="Loader-text">Buscando...</span>
                                        </div>
                                    </div>
                                }
                                {
                                    1 === currentAppState && !loading &&
                                    <HotelsList 
                                        items={dataHotels} 
                                        pages={pages} 
                                        pageIndex={pageIndex}
                                        onPrev={ this._handleIndexChange }
                                        onNext={ this._handleIndexChange } 
                                        onPageClicked={this._handlePageClicked}
                                    />
                                }
                                {
                                    0 === currentAppState &&
                                    <div className="NoResultsContainer">
                                        <span className="NoResultsText">No encontramos disponibilidad para tu búsqueda.</span>
                                        <span className="NoResultsText">Intentá nuevamente.</span>
                                        <img className="NoResultsLogo" src={noResults} alt="noResults" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;