# GitHub 推送說明

由於權限問題，您無法直接通過 Cursor 推送到 GitHub。請按照以下步驟手動推送：

## 方法 1：使用個人訪問令牌 (PAT)

1. 訪問 GitHub 的[個人訪問令牌設置頁面](https://github.com/settings/tokens)
2. 點擊 "Generate new token" > "Generate new token (classic)"
3. 為令牌提供一個描述性名稱，例如 "Chat-With-You 推送訪問"
4. 選擇以下範圍：`repo`（完整控制私有倉庫）
5. 點擊 "Generate token" 底部的按鈕
6. 複製生成的令牌（重要：這是唯一一次能看到完整令牌）

然後在終端中執行以下命令（將 `YOUR_USERNAME` 和 `YOUR_TOKEN` 替換為您的 GitHub 用戶名和生成的令牌）：

```bash
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/andy0958338099/Chat-With-You.git
git push -u origin main
```

## 方法 2：使用 SSH 密鑰

1. 檢查是否已有 SSH 密鑰：
   ```bash
   ls -al ~/.ssh
   ```

2. 如果沒有，生成 SSH 密鑰：
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. 將 SSH 密鑰添加到 ssh-agent：
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

4. 複製公鑰：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

5. 訪問 GitHub 的 [SSH and GPG keys 設置頁面](https://github.com/settings/keys)
6. 點擊 "New SSH key"，為密鑰提供一個標題，粘貼您的公鑰，然後點擊 "Add SSH key"

7. 更改遠程 URL 為 SSH 格式：
   ```bash
   git remote add origin git@github.com:andy0958338099/Chat-With-You.git
   git push -u origin main
   ```

## 方法 3：使用 GitHub CLI

1. 安裝 GitHub CLI：
   ```bash
   # macOS
   brew install gh
   
   # Windows (使用 scoop)
   scoop install gh
   
   # Windows (使用 chocolatey)
   choco install gh
   ```

2. 登入 GitHub：
   ```bash
   gh auth login
   ```
   按照提示進行操作

3. 推送到 GitHub：
   ```bash
   git remote add origin https://github.com/andy0958338099/Chat-With-You.git
   git push -u origin main
   ```

## 故障排除

如果您繼續遇到問題，可能是：

1. GitHub 帳戶或密碼不正確
2. 倉庫可能不存在或您沒有寫入權限
3. 防火牆或代理問題

請確保您有正確的權限並已正確設置身份驗證。 