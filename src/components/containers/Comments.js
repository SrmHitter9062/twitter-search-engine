import React , { Component } from 'react'
import { CreateComment , Comment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      list: []
    }
  }
  componentDidMount(){
    console.log('Comments componentDidMount')
    APIManager.get('/api/comment',null,(err,response)=>{
      if(err){
        alert('ERROR :'+err.message)
        return
      }
      let results = response.results
      this.setState({
        list:results
      })
    })
  }
  submitComment(comment){
    let updatedComment = Object.assign({},comment)
    APIManager.post('/api/comment',updatedComment,(err,response)=>{
      if(err){
        console.log("ERR :"+err)
        return
      }
      console.log('COMMENT CREATED : '+JSON.stringify(response))
      let updatedList = Object.assign([],this.state.list)
      updatedList.push(response.results)
      this.setState({
        list:updatedList
      })

    })
  }
  render(){
    const commentList = this.state.list.map((comment ,i ) =>{
        return(
          <li key = {i}><Comment currentComment ={comment} /></li>
        )
    } )
    return(
      <div>
        <h2>Comments:Zone 1 </h2>
          <div style={styles.comment.commentBox}>
            <ul style={styles.comment.commentsList}>
              { commentList}
            </ul>
              <CreateComment onCreate={this.submitComment.bind(this)}/>
          </div>
      </div>
    )
  }
}

export default Comments
