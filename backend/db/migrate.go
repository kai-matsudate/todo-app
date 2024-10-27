package db

import (
	"fmt"
	"github.com/kai-matsudate/todo-app/backend/graph/model"
	"log"
)

func Migrate() error {
	// DBインスタンスが初期化されているか確認
	if DB == nil {
		return fmt.Errorf("DB instance is not initialized")
	}

	// スキーマのマイグレーションを実行
	err := DB.AutoMigrate(
		&model.User{},
		&model.Todo{},
	)
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
		return err
	}

	log.Println("Database migration completed successfully!")
	return nil
}
