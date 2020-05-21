import React, { ReactComponentElement, ReactElement } from 'react'


export interface targetInfo{
    skillname:string;
    position_x:number;
    position_y:number;
    status:string;
    clickFunction?:any;
}

interface IAreaProps{
    target:Map<string,targetInfo>;
    clickFunction:any;
}

const statusColor:any={
    'waiting':'white',
    'clear':'Green',
    'wrong':'Red'
}

class ClickImage extends React.Component<targetInfo>{
    render(){
        //console.log(this.props.skillname);
    return (<div className={`${this.props.skillname} radiusBox ${this.props.status}`} 
        style={{top:this.props.position_x,
                left:this.props.position_y,
                
            position:"absolute"}} onClick={this.props.clickFunction}>{this.props.skillname}</div>);
    }

}

export default class Area extends React.Component<IAreaProps>{
    render (){
        const itemList:ReactElement[]=[];
        let i=0;
        let clickFunciton=this.props.clickFunction;
        this.props.target.forEach(function(value,key){

            itemList.push(<ClickImage key={i++} {...value} clickFunction={clickFunciton}/>)
        });

        return  (
            <div className='area'>
            {itemList}

            </div>
        )
    }

}