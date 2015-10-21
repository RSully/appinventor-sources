function NativeToAI(v) {
    if (typeof v === "object") {
        return v;
    }
    
    if (typeof v === "string") {
        return new AIText(v);
    }
    if (typeof v === "number") {
        // todo
    }
    if (typeof v === "boolean") {
        return new AIBool(v);
    }

    if (typeof v === "function") {
        return this.call(this, v);
    }

    // whoops? shouldn't get here!
    return null;
}
