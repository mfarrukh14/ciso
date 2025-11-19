# Fix Git Submodule Issue

The `Hedging` directory is incorrectly configured as a Git submodule. Follow these steps to fix it:

## Steps to Fix

1. **Remove the submodule reference from Git index:**
   ```bash
   git rm --cached Hedging
   ```

2. **Remove the submodule directory from .git/modules (if it exists):**
   ```bash
   rm -rf .git/modules/Hedging
   ```

3. **Add Hedging as a regular directory:**
   ```bash
   git add Hedging/
   ```

4. **Commit the changes:**
   ```bash
   git commit -m "Fix: Convert Hedging from submodule to regular directory"
   ```

5. **Push to repository:**
   ```bash
   git push origin main
   ```

## Alternative: If you want to keep Hedging as a submodule

If you actually want `Hedging` to be a submodule, create a `.gitmodules` file:

```ini
[submodule "Hedging"]
    path = Hedging
    url = https://github.com/your-username/hedging-repo.git
```

Then run:
```bash
git submodule update --init --recursive
```

## Recommended Solution

Since `Hedging` is part of the same project, it's better to keep it as a regular directory (not a submodule). Follow steps 1-5 above.

