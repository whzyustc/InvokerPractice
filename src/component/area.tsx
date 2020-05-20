import React, { ReactComponentElement, ReactElement } from 'react'


export interface targetInfo{
    skillname:string;
    position_x:number;
    position_y:number;
}

interface IAreaProps{
    target:Set<targetInfo>;
}


class ClickImage extends React.Component<targetInfo>{
    render(){
        console.log(this.props.skillname);
    return (<li className={`${this.props.skillname} radiusBox`} 
        style={{top:this.props.position_x,
                left:this.props.position_y,
            position:"absolute"}}>{this.props.skillname}</li>);
    }

}

export default class Area extends React.Component<IAreaProps>{
    render (){
        const itemList:ReactElement[]=[];
        this.props.target.forEach(function(value,key){

            itemList.push(<ClickImage {...key}/>)
        });

        return  (
            <div className='area'>
            <ul>{itemList}</ul>

            </div>
        )
    }

}