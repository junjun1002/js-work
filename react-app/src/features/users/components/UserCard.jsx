/**
 * ユーザーカードコンポーネント
 * @component
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.name - ユーザーの名前
 * @param {number} props.coin - ユーザーのコイン数
 * @returns {JSX.Element} ユーザーカードのJSX要素
 */
export default function UserCard(props){
    // ユーザーカードのJSX要素を返す
    return(
        // ユーザーカードの内容を表示するためのJSX要素
        <div>
            // ユーザーの名前とコイン数を表示するためのJSX要素
            <p>name: {props.name}</p>
            <p>coin: {props.coin}</p>
        </div>
    );
}