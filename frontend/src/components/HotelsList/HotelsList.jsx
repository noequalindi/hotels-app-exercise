import React, { PureComponent } from 'react';
import HotelDetail from '../HotelDetail/HotelDetail';
import PaginationList from '../PaginationList/PaginationList';

import '../HotelsList/styles.scss';

class HotelsList extends PureComponent {

    render() {
        const { onPageClicked, onPrev, onNext } = this.props;
        
        return (
            <div className="HotelList">
                {
                    this.props.items && this.props.items.map((item, idx) => {
                        return <HotelDetail key={idx} item={item} />
                    })
                }
                <PaginationList onPageClick={onPageClicked} onPrev={onPrev} onNext={onNext} pages={this.props.pages} pageIndex={this.props.pageIndex}/>
            </div>
        );
    }
}

export default HotelsList;