
// class define
function BlockIndex()
{
    this.index = 0;

}

BlockIndex.prototype.next = function() {
    var cur = g_block_list[this.index];
    this.index++;
    return cur;
};

BlockIndex.prototype.nextList = function() {
    var next_list = [];
    next_list.push(g_block_list[this.index]);
    next_list.push(g_block_list[this.index + 1]);
    next_list.push(g_block_list[this.index + 2]);

    return next_list;
};


