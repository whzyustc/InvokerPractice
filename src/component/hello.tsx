import React from "react"

export interface IHelloProps {
    compiler:string;
    framework:string;
}

export default class SideTab extends React.Component<IHelloProps>
{
    render(){
     return <ul>{`this ${this.props.compiler} and ${this.props.framework} project`.split(' ').map((item,index)=><li key={index}>{item}</li>)}</ul>
    }
}

// export const Hello =(props: HelloProps)=><h1>Hello from {props.compiler} and {props.framework}</h1>;
