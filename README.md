# NIJISANJI-MESH

にじさんじメンバーの関係性を可視化します

## サイト

URL

## 概要

各メンバーの生放送チャット欄で、他のメンバーの名前が出た回数をカウントしています。例えば、月ノ美兎の配信チャット欄で「樋口楓」「でろーん」「かえ姉」などのコメント回数から、2 人の関係の強さを計算しています。

## 起動方法

1. `git clone git@github.com:OoyamaYoshito/nijisanji_mesh.git`
1. `cd nijisanji_mesh`
1. `npm i`
1. `npm run scraping`
1. `npm run start`
1. `localhost:3000` にアクセス

## ポリシー

本プロジェクトは、ファンプロジェクトであり、にじさんじ公式とは関係ありません。

本プロジェクトは、[にじさんじ二次創作ガイドライン](https://event.nijisanji.app/guidelines/)に準拠します。本プロジェクトに、公式コンテンツイメージを損なわせるような意図はありません。

本プロジェクトで扱う情報は、以下の Web サイトから取得しました。各資源へのアクセスを 7000ms 以上の間隔を空けて行うことで、外部サイトへの負荷を軽減しています。

- にじさんじメンバーの一覧とアイコン: [にじさんじ公式サイト](https://nijisanji.ichikara.co.jp/member/)
- メンバーの呼び方: [メンバー間の呼び方一覧 - にじさんじ Wiki](https://wikiwiki.jp/nijisanji/%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E9%96%93%E3%81%AE%E5%91%BC%E3%81%B3%E6%96%B9%E4%B8%80%E8%A6%A7)
- コメント情報: [VTuber コメント検索](https://comment.vtubersoft.com/)

本プロジェクトに問題がある場合は、リポジトリの[issue](https://github.com/OoyamaYoshito/nijisanji_mesh/issues)へご一報ください。

## 謝辞

[sititou70/yurigraph](https://github.com/sititou70/yurigraph)

ページレイアウトやグラフの作成方法などについて、参考にさせていただきました。

## ライセンス

MIT
