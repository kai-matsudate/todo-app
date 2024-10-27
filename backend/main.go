package main

import (
	"github.com/kai-matsudate/todo-app/backend/db"
	"log"
	"net/http"
	"os"
)

const defaultPort = "8080"

func main() {
	// データベース接続を初期化
	db.InitDatabase()

	db.Migrate()

	// 環境変数からポートを取得
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// set router
	r := NewRouter()

	// init server
	log.Printf("Server is running at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
