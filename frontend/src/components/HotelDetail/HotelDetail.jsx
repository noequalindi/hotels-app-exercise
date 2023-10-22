import React, { PureComponent } from "react";
import '../../scss/ItemDetail.scss';
import '../../scss/Button.scss';
import '../../scss/utils.scss';
import '../../scss/Icons.scss';


class HotelDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.srcReference = "http://localhost:3001/assets/images/hotels/"
    this.placeHolderImage =  "http://localhost:3001/assets/images/hotels/non-existent.png"

    this.state = {
      error: false
    }
  }
  renderStars(amount) {
    return Array(amount).fill('').map((amount, idx) => {
        return <span key={idx} className="stars" />
    });
  }

  renderAmenities(item) {
      return item.map((amenitie, idx) => {
            return <span key={idx} className={`Amenities ${amenitie}`} title={amenitie}></span>
      })
  }

  render() {
    const { item } = this.props;

    return (
      <div className="LongCard">
        <div className="LongCard-Column">
            <div className="LongCard-ImageContainer">
                <img alt="Hotel" className="LongCard-Image" 
                src={this.srcReference + item.image} 
                ref={ img => this.img = img } 
                onError={ () => this.img.src = this.placeHolderImage }/> 
            </div>
        </div>
        <div className="LongCard-Column LongCard-Body v-verticalAlignTop">
            <span className="ItemDetail-title">{item.name}</span>
            <div className="ItemDetail-starRating">{ this.renderStars(item.stars) }</div>
            <div className="ItemDetail-amenities">{ this.renderAmenities(item.amenities) }</div>
        </div>
        <div className="LongCard-Column LongCard-Column--short v-verticalAlignCenter v-leftDotBorder">
            <div className="LongCard-ItemRow">
                <span className="ItemDetail --description">Precio por noche por habitación</span>
            </div>
            <div className="LongCard-ItemRow">
                <span className="ItemDetail --text-price-type">ARS</span>  <span className="ItemDetail --text-price"> { Math.round(item.price)} </span>
            </div>
            <div className="LongCard-ItemRow">
                <button className="Button Button--primary-extended">Ver hotel</button>
            </div>
        </div>
      </div>
    );
  }
}

export default HotelDetail;
