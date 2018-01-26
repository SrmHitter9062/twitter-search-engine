import React , { Component } from 'react'
import styles from './styles'

class Zones extends Component{
  onSelectTitle(event){
    event.preventDefault()
    // console.log('onSelectTitle');
    this.props.select(this.props.index);
  }
  render(){
    const zoneStyle = styles.zone
    const zipCode = this.props.currentZone.zipCodes[0]
    const title = (this.props.isSelected) ? <a style={zoneStyle.title} href="#">{this.props.currentZone.name}</a>: <a href="#">{this.props.currentZone.name}</a>
    return(
        <div style={zoneStyle.container}>
          <h2 style={zoneStyle.header} onClick={this.onSelectTitle.bind(this)}>
            { title }
          </h2>
          <span className="detail">{zipCode}</span><br/>
          <span className="detail">{this.props.currentZone.numComments} comments</span>
        </div>
    )
  }
}

export default Zones
