package main

import (
	"github.com/kai-matsudate/nextjs-study/backend/db"
	"log"
	"net/http"
	"os"
)

const defaultPort = "8080"

func main() {
	// データベース接続を初期化
	InitDatabase()

	// データベースに接続できているか確認
	if DB != nil {
		log.Println("Connected to the database!")
	} else {
		log.Fatal("Failed to connect to the database.")
	}

	// 環境変数からポートを取得
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// ルーターを設定
	r := NewRouter()

	// サーバーを開始
	log.Printf("Server is running at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
