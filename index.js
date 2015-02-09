

function buildThenable() {
  return {
    then: function(onFulfill, onReject) {
      if (this.resolved) {
        onFulfill(this.resolveValue);
        return this;
      }

      if (this.rejected && onReject) {
        onReject(this.rejectValue);
        return this;
      }
      return this;
    },

    catch: function(onReject) {
      if (this.rejected) {
        onReject(this.rejectValue);
        return this;
      }
      return this;
    }
  };
}

function setup(sinon) {
  sinon.stub.resolves = function(value) {
    this.thenable.resolved = true;
    this.thenable.resolveValue = value;
    return this;
  };

  sinon.stub.rejects = function(value) {
    this.thenable.rejected = true;
    this.thenable.rejectValue = value;
    return this;
  };

  sinon.stubPromise = function() {
    var thenable = buildThenable();
    var stub = sinon.stub();
    stub.thenable = thenable;
    stub.returns(thenable);

    return stub;
  };
}

if (module && module.exports) {
  module.exports = setup;
} else if (window.sinon) {
  setup(window.sinon);
}
