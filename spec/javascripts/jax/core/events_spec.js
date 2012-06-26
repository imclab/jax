describe("Jax.EventEmitter", function() {
  var emitter, evt, listenerID;
  
  beforeEach(function() {
    emitter = Jax.Class.create({ });
    emitter.addMethods(Jax.EventEmitter);
    emitter = new emitter();
    listenerID = emitter.addEventListener('evt', function(obj) { evt = obj; });
  });
  
  // don't taint other tests
  afterEach(function() { evt = undefined; });
  
  it("should pass events to listeners", function() {
    var result = false;
    emitter.addEventListener('evt', function(evt) { result = evt; });
    emitter.fireEvent('evt', 1);
    expect(result).toBeTruthy();
  });

  it("should work with no event at all", function() {
    emitter.fireEvent('evt');
    expect(evt).toBeUndefined();
  });
  
  it("should set a default +type+ property on events", function() {
    emitter.fireEvent('evt', { });
    expect(evt.type).toEqual('evt');
  });
  
  it("should not override a +type+ property on events", function() {
    emitter.fireEvent('evt', { type: 'one' });
    expect(evt.type).toEqual('one');
  });
  
  it("should be un-listenenable", function() {
    emitter.removeEventListener('evt', listenerID);
    emitter.fireEvent('evt', {});
    expect(evt).toBeUndefined(); // because the original listener never was fired
  });
  
  it("should be un-listenable out of order", function() {
    // add a second listener. Its index is 1. If we remove index 0, we should still
    // be able to remove index 1. At that point no listeners should exist.
    var second = false, secondID;
    secondID = emitter.addEventListener('evt', function() { second = true; });
    emitter.removeEventListener('evt', listenerID);
    emitter.removeEventListener('evt', secondID);
    emitter.fireEvent('evt', {});
    // neither should have fired
    expect(second).toBeFalsy();
    expect(evt).toBeUndefined();
  });
});
