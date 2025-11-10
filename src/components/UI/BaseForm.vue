<template>
  <div class="title">
    <slot name="title"></slot>
  </div>

  <form>
    <div class="form-input">
      <slot name="input"></slot>
    </div>

    <button class="form-btn">
      <slot name="form-btn"> </slot>
    </button>
  </form>
</template>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 36px;
}

.form-input {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

:deep(input) {
  border: none;
  outline: none;
  padding: 12px 12px 4px 12px;
  background-color: var(--color-secondary);
  border-bottom: 1px solid #888;
  font-size: 13px;
}

:deep(label) {
  margin-left: 12px;
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--color-table-content);
}

.form-btn {
  padding: 6px 24px;
  border-radius: 2px;
  border: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  background-color: var(--color-blue);
  width: 100%;
  color: var(--color-primary);
  margin-top: 30px;
}

.form-btn:hover {
  background-color: var(--color-blue-dark);
}
</style>
