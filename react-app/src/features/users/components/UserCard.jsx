export default function UserCard(props){
    return(
        <div>
            <p>name: {props.name}</p>
            <p>coin: {props.coin}</p>
        </div>
    );
}