import React from   'react'
import './header.css'

 

interface IHeaderProps{
    qius:string[],
    jinengs:string[],
    current:string;
}

export default class Header extends React.Component<IHeaderProps>{
    
    render(){
        //console.log(this.props.qius.map((item,index)=>item));
        return (
            
            <div className="header">
                {this.props.qius.map((item,index)=><QiuImage imagename={item} key={index}/>)}
                {this.props.jinengs.map((item,index)=><SkillImage imagename={item} key={1-index}  borderStyle={`${this.props.current!=''&&this.props.current==item?'selected':'pending'}`}/>)}
            </div>
        )
    }
}

interface IImageProps{
    imagename:string;
    borderStyle?:string;
}


export class QiuImage extends React.Component<IImageProps>{
    render(){
        return (
            <div className={`${this.props.imagename} imageBox`} >{this.props.imagename}</div>
        )
    }

}
export class SkillImage extends React.Component<IImageProps>{
    render(){
        return (
            <div className={`${this.props.imagename} skillimageBox ${this.props.borderStyle}`} >{this.props.imagename}</div>
        )
    }        


}