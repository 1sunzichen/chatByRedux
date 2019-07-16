import React from 'react';
import { Grid ,List} from 'antd-mobile';
import Proptypes from "prop-types";
class Avaselector extends React.Component{
    static propsTypes={
        selectAvatar:Proptypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render(){
        const avatarList='cat,dog,horse,lion,lu,ox,panda,shizi,yang,bastet,horus'.split(",")
            .map(v=>({
                icon:require(`../image/${v}.jpg`),
                text:v
            })
        );
        const gridJeader=this.state.el?(<div>
            <span>已选择头像</span>
            <img src={this.state.el.icon} style={{width:20}}></img>
        </div>):
        <div>请选择头像</div>;
        return(
            <div>
                <List renderHeader={()=>gridJeader}>

                <Grid data={avatarList}
                activeStyle={false}
                columnNum={3}
                onClick={el=>{
                    this.setState({
                        el
                    })
                    console.log(el);
                    
                    this.props.selectAvatar(el.text)
                }}
                ></Grid>
                </List>
            </div>
        )
    }
}
export default Avaselector;