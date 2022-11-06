const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  describe("given no input", () => {
    it("Returns the literal '0' when given no input", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  });

  describe("given event as input and partitionKey is exists", () => {
    it("Return something when partitionKey type is string and partitionKey is null", () => {
      const stubEvent = {
        partitionKey: null
      };

      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2');
    });

    it("Return something when partitionKey type is string and partitionKey is undefined", () => {
      const stubEvent = {
        partitionKey: undefined
      };

      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862');
    });

    it("Return something when partitionKey type is string and partitionKey length less than 256", () => {
      const stubEvent = {
        partitionKey: 'stub-partition-key'
      };

      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('stub-partition-key');
    });

    it("Return something when partitionKey type is string and partitionKey length more than 256", () => {
      let template = 'stub-string'
      let stubString = '';
      for (var i = 0; i < 300; i++) {
        stubString += template;
      }

      const stubEvent = {
        partitionKey: stubString
      };

      expect(stubString.length).toBeGreaterThan(256);
      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('142c6f4b0c71b2da99343982fcf101e2b67cb760ded5a66de2487c3cebebd1200f1a3813e5390b75a2236b3eaf45b063a6897b1ed090dd89c04fa7538a667d4d');
    });

    it("Return something when partitionKey type is not string and partitionKey length less than 256", () => {
      const stubEvent = {
        partitionKey: {
          'stub-key': 'stub-value'
        }
      };

      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe("{\"stub-key\":\"stub-value\"}");
    });

    it("Return something when partitionKey type is not string and partitionKey length more than 256", () => {
      let stubPartitionKey = [];
      for (var i = 0; i < 300; i++) {
        const data = {
          'key1': '1',
          'key2': '2',
          'key3': '3',
          'key4': '4'
        };

        stubPartitionKey.push(data);
      }

      const stubEvent = {
        partitionKey: stubPartitionKey
      };

      expect(stubEvent.partitionKey.length).toBeGreaterThan(256);
      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('fd1a600ecebbd8316c19c58e47922e0e14c8323c9d19a11f96348fc430ca94ea77cd5688b9db6d90f73aa571f75f4d03cf38f094893072b6e4755847a2c6d34d');
    });
  });

  describe("given event as input and partitionKey is not exists", () => {
    it("Return something when event type is not string", () => {
      const stubEvent = 123456;

      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('64d09d9930c8ecf79e513167a588cb75439b762ce8f9b22ea59765f32aa74ca19d2f1e97dc922a3d4954594a05062917fb24d1f8e72f2ed02a58ed7534f94d27');
    });

    it("Return something when event type is string", () => {
      const stubEvent = 'stub-string';

      const trivialKey = deterministicPartitionKey(stubEvent);
      expect(trivialKey).toBe('485910d6f12fa4ac3c40703ca0c2903aeef228223c1fb39b60a56a10057aefcc9ab2844f9577df2c674c682468349a50a87a6f0d3d9716eacdfccb4deb9b62d9');
    });
  });
});
