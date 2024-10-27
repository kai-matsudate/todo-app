package main

import (
	"log"
	"net/http"
	"os"
)

const defaultPort = "8080"

func main() {
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
