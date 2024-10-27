package entity

// Code generated by xo. DO NOT EDIT.

import (
	"context"
	"database/sql"
)

// Todo represents a row from 'public.todos'.
type Todo struct {
	ID     string         `json:"id"`      // id
	Text   sql.NullString `json:"text"`    // text
	Done   sql.NullBool   `json:"done"`    // done
	UserID sql.NullString `json:"user_id"` // user_id
	// xo fields
	_exists, _deleted bool
}

// Exists returns true when the [Todo] exists in the database.
func (t *Todo) Exists() bool {
	return t._exists
}

// Deleted returns true when the [Todo] has been marked for deletion
// from the database.
func (t *Todo) Deleted() bool {
	return t._deleted
}

// Insert inserts the [Todo] to the database.
func (t *Todo) Insert(ctx context.Context, db DB) error {
	switch {
	case t._exists: // already exists
		return logerror(&ErrInsertFailed{ErrAlreadyExists})
	case t._deleted: // deleted
		return logerror(&ErrInsertFailed{ErrMarkedForDeletion})
	}
	// insert (manual)
	const sqlstr = `INSERT INTO public.todos (` +
		`id, text, done, user_id` +
		`) VALUES (` +
		`$1, $2, $3, $4` +
		`)`
	// run
	logf(sqlstr, t.ID, t.Text, t.Done, t.UserID)
	if _, err := db.ExecContext(ctx, sqlstr, t.ID, t.Text, t.Done, t.UserID); err != nil {
		return logerror(err)
	}
	// set exists
	t._exists = true
	return nil
}

// Update updates a [Todo] in the database.
func (t *Todo) Update(ctx context.Context, db DB) error {
	switch {
	case !t._exists: // doesn't exist
		return logerror(&ErrUpdateFailed{ErrDoesNotExist})
	case t._deleted: // deleted
		return logerror(&ErrUpdateFailed{ErrMarkedForDeletion})
	}
	// update with composite primary key
	const sqlstr = `UPDATE public.todos SET ` +
		`text = $1, done = $2, user_id = $3 ` +
		`WHERE id = $4`
	// run
	logf(sqlstr, t.Text, t.Done, t.UserID, t.ID)
	if _, err := db.ExecContext(ctx, sqlstr, t.Text, t.Done, t.UserID, t.ID); err != nil {
		return logerror(err)
	}
	return nil
}

// Save saves the [Todo] to the database.
func (t *Todo) Save(ctx context.Context, db DB) error {
	if t.Exists() {
		return t.Update(ctx, db)
	}
	return t.Insert(ctx, db)
}

// Upsert performs an upsert for [Todo].
func (t *Todo) Upsert(ctx context.Context, db DB) error {
	switch {
	case t._deleted: // deleted
		return logerror(&ErrUpsertFailed{ErrMarkedForDeletion})
	}
	// upsert
	const sqlstr = `INSERT INTO public.todos (` +
		`id, text, done, user_id` +
		`) VALUES (` +
		`$1, $2, $3, $4` +
		`)` +
		` ON CONFLICT (id) DO ` +
		`UPDATE SET ` +
		`text = EXCLUDED.text, done = EXCLUDED.done, user_id = EXCLUDED.user_id `
	// run
	logf(sqlstr, t.ID, t.Text, t.Done, t.UserID)
	if _, err := db.ExecContext(ctx, sqlstr, t.ID, t.Text, t.Done, t.UserID); err != nil {
		return logerror(err)
	}
	// set exists
	t._exists = true
	return nil
}

// Delete deletes the [Todo] from the database.
func (t *Todo) Delete(ctx context.Context, db DB) error {
	switch {
	case !t._exists: // doesn't exist
		return nil
	case t._deleted: // deleted
		return nil
	}
	// delete with single primary key
	const sqlstr = `DELETE FROM public.todos ` +
		`WHERE id = $1`
	// run
	logf(sqlstr, t.ID)
	if _, err := db.ExecContext(ctx, sqlstr, t.ID); err != nil {
		return logerror(err)
	}
	// set deleted
	t._deleted = true
	return nil
}

// TodoByID retrieves a row from 'public.todos' as a [Todo].
//
// Generated from index 'todos_pkey'.
func TodoByID(ctx context.Context, db DB, id string) (*Todo, error) {
	// query
	const sqlstr = `SELECT ` +
		`id, text, done, user_id ` +
		`FROM public.todos ` +
		`WHERE id = $1`
	// run
	logf(sqlstr, id)
	t := Todo{
		_exists: true,
	}
	if err := db.QueryRowContext(ctx, sqlstr, id).Scan(&t.ID, &t.Text, &t.Done, &t.UserID); err != nil {
		return nil, logerror(err)
	}
	return &t, nil
}

// User returns the User associated with the [Todo]'s (UserID).
//
// Generated from foreign key 'fk_todos_user'.
func (t *Todo) User(ctx context.Context, db DB) (*User, error) {
	return UserByID(ctx, db, t.UserID.String)
}
