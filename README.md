# 希望休管理サイト

従業員が月ごとに希望休(出勤できない日)を申請し、管理者が一覧・上限人数・
公開状況を管理できるツールです。GitHub Pagesで公開し、データはFirebase
Firestore(無料枠)に保存されます。

- 従業員用ページ: `employee/index.html`
- 管理者用ページ: `admin/index.html`

GitHub Pagesで公開すると、URLはそれぞれ以下のようになります(例):

```
https://<ユーザー名>.github.io/<リポジトリ名>/employee/
https://<ユーザー名>.github.io/<リポジトリ名>/admin/
```

従業員には `employee/` のURLだけ、管理者には `admin/` のURLだけを
共有してください。

---

## セットアップ手順

### 1. Firebaseプロジェクトを作成する

1. https://console.firebase.google.com/ にアクセスし、Googleアカウントで
   ログインして「プロジェクトを追加」。無料の「Sparkプラン」で十分です。
2. 作成したプロジェクトの「プロジェクトの設定」(左上の⚙️) を開き、
   「マイアプリ」から「ウェブアプリを追加」(`</>` アイコン)。
3. アプリのニックネームは何でも構いません(例: `kibou-kyuu`)。
   「Firebase Hosting」の設定は不要なのでチェックしなくてOKです。
4. 表示される `firebaseConfig` の値(`apiKey`, `authDomain`, `projectId` など)
   をコピーし、このリポジトリの `firebase-config.js` に貼り付けて保存します。

### 2. Firestoreデータベースを有効化する

1. Firebaseコンソールの左メニューから「Firestore Database」を選択し、
   「データベースの作成」。
2. ロケーションは日本に近いもの(例: `asia-northeast1` 東京)を選択。
3. 最初は「テストモード」でも構いませんが、必ず後述のルールに置き換えてください。
4. 「ルール」タブを開き、このリポジトリの `firestore.rules` の内容を
   コピーして貼り付け、「公開」します。

### 3. GitHubにアップロードしてGitHub Pagesで公開する

1. GitHubで新しいリポジトリを作成し、このフォルダの内容をすべて
   アップロード(push)します。
2. リポジトリの「Settings」>「Pages」を開き、
   「Source」を `Deploy from a branch`、ブランチを `main`(または該当ブランチ)、
   フォルダを `/ (root)` に設定して保存します。
3. 数分待つと、上記の従業員用・管理者用URLでアクセスできるようになります。

### 4. 動作確認

1. まず管理者用URL(`admin/`)を開き、「従業員リストの管理」から
   従業員名を登録します。
2. 従業員用URL(`employee/`)を開き、名前を選んで希望休を送信できるか
   確認します。
3. 管理者用ページの表にリアルタイムで反映されることを確認してください。

---

## データの持ち方(Firestore)

- `employees/list` … 従業員名のリスト `{ names: string[] }`
- `requests/{従業員名}__{年-月}` … 各従業員の月ごとの希望休
  `{ employee, yearMonth, offDays: number[], updatedAt }`
- `capacity/{年-月}` … 日ごとの上限人数設定 `{ limits: { "1": 3, "5": 2, ... } }`
- `settings/monthVisibility` … 非公開にした月の一覧 `{ closed: ["2026-11", ...] }`

## セキュリティに関する注意

`firestore.rules` は初期状態で「誰でも読み書き可能」になっています。
社内の限られたメンバーにのみURLを共有する運用を前提としています。
より厳密にアクセス制限したい場合は、Firebase Authenticationの導入
(特に管理者ページ側にログインを必須にする)を検討してください。
必要であれば追加の実装も可能です。
