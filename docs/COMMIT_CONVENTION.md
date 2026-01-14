# Commit Message Guidelines

## Format

Commit messages phải theo format:

```
type: subject
```

### Ví dụ hợp lệ ✅

```bash
feat: add global styles and theme management
fix: resolve navigation bug
docs: update readme with installation steps
style: format code with prettier
refactor: restructure api service layer
perf: optimize image loading
test: add unit tests for auth service
build: update dependencies
ci: add github actions workflow
chore: update gitignore
```

### Ví dụ KHÔNG hợp lệ ❌

```bash
# ❌ Không có type
add new feature

# ❌ Subject viết hoa
feat: Add new feature

# ❌ Không có subject
feat:

# ❌ Không có dấu hai chấm
feat add feature

# ❌ Scope (không bắt buộc nhưng nếu có thì đúng format)
feat(auth): Add login  # Subject phải lowercase
```

## Types

- **feat**: Tính năng mới
- **fix**: Sửa bug
- **docs**: Thay đổi documentation
- **style**: Format code (không ảnh hưởng logic)
- **refactor**: Refactor code
- **perf**: Cải thiện performance
- **test**: Thêm/sửa tests
- **build**: Thay đổi build system hoặc dependencies
- **ci**: Thay đổi CI/CD
- **chore**: Công việc bảo trì khác

## Rules

1. ✅ **Type bắt buộc** - Phải có một trong các types ở trên
2. ✅ **Subject bắt buộc** - Không được để trống
3. ✅ **Subject lowercase** - Viết thường toàn bộ
4. ✅ **Max length 100 ký tự** - Header không quá dài
5. ✅ **Format**: `type: subject` - Có dấu hai chấm và space

## Commit với Git

```bash
# Commit đơn giản
git commit -m "feat: add user authentication"

# Commit với body
git commit -m "feat: add user authentication" -m "Implement login and register functionality with JWT tokens"

# Nếu commit bị reject
git commit --amend -m "feat: add user authentication"
```

## Husky Hook

Pre-commit hook sẽ tự động:

1. Chạy type checking
2. Chạy linting
3. Format code
4. Validate commit message

Nếu có lỗi, commit sẽ bị reject và bạn cần sửa.
