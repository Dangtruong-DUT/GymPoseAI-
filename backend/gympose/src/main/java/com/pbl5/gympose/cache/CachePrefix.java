package com.pbl5.gympose.cache;

import lombok.Getter;

@Getter
public enum CachePrefix {
    BLACK_LIST_TOKENS("black_list_tokens:");

    private final String prefix;

    CachePrefix(String prefix) {
        this.prefix = prefix;
    }
}
