/*
  このファイルは、画面全体の親になるコンポーネントです。
  Reactでは、画面を部品（コンポーネント）に分けて作っていきますが、
  その一番大きな土台が App です。

  課題で作る部品や表示内容は、
  最終的にこの App から呼び出して画面に並べていくことになります。

  つまり、「このアプリで何を表示するか」を組み立てる中心のファイルです。
*/

import UserCard from '../features/users/components/UserCard';

export default function App() {
  return (
    <main>
      {/* 画面の見出し */}
      <h1>React App</h1>

      {/* 最初の説明文 */}
      <p>Start building from this scaffold.</p>

      {/* ユーザーカードを表示するためのコンポーネントを呼び出す */}
      <UserCard name="Taro" coin={100} />
      <UserCard name="Hanako" coin={300} />
    </main>
  );
}
