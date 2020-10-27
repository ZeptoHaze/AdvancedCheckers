import React from 'react';
import './Board.css';
import ReactDOM from "react-dom";
import Piece from "./Piece";
class Tile extends React.Component{

    constructor(props) {
        super(props);
    }

    render()
    {

        return (
            <div
                className={this.props.tileColor == "#484848" ? 'tile black' : 'tile white'}
                onClick={this.props.onClick}
                background-color={this.props.tileColor}
                x = {this.props.x}
                y = {this.props.y}
                piece = {this.props.piece}
                >
                {this.props.piece}
            </div>

        );
    }
}

class Board extends React.Component {


    render(){
        return (
            <div className={"board"}>
                {this.renderBoard(this.createEmptyBoard())}
            </div>
        )
    }

    createEmptyBoard(){
        let matrix = [];
        for (let i = 0; i < 8; i++){
            matrix.push([]);
            for (let j = 0; j < 8; j++){
                let color = "#2f51c4";
                if ((i & 1) === 0 && (j & 1) === 1){
                    color = "#484848";
                } else if ((i & 1) === 1 && (j & 1) === 0){
                    color = "#484848";
                }

                matrix[i][j] = {
                    x:i,
                    y:j,
                    tileColor:color
                }
            }
        }
        return matrix;
    }

    renderBoard(matrix){
        return matrix.map( (row) => {
            return row.map( (item) => {
                return (
                    <div
                        key = {item.x * row.length + item.y}>
                        <Tile
                            //onClick = { () => this.handleTileClick(item.x,item.y)}
                            value = {item}
                            x = {item.x}
                            y = {item.y}
                            tileColor = {item.tileColor}
                            piece = {<Piece part = {this.checkStartPiece(item.x,item.y)} side = {this.checkSide(item.x)}/>}
                        />
                        {(row[row.length - 1] === item) ? <div className="clear"/> : ""}
                    </div>);
            })
        });
    }

    checkStartPiece(x, y){
        if(x === 1 | x === 6){
            return 0;
        }
        if( x === 0){
            if (y === 0 | y === 7){
                return 1;
            }
            if (y === 1 | y === 6){
                return 2;
            }
            if (y === 2 | y === 5){
                return 3;
            }
            if (y === 3){
                return 4;
            }
            if (y === 4){
                return 5;
            }

        }

        if (x === 7){
            if (y === 0 | y === 7){
                return 1;
            }
            if (y === 1 | y === 6){
                return 2;
            }
            if (y === 2 | y === 5){
                return 3;
            }
            if (y === 3){
                return 4;
            }
            if (y === 4){
                return 5;
            }
        }

        return -1;
    }

    checkSide(x){
        if(x <= 1){
            return 1;
        }
        if (x >= 6){
            return 0;
        }
        return -1;
    }

}
ReactDOM.render(<Board />, document.getElementById("root"));

export default Board;
