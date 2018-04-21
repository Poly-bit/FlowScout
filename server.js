const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

    let buf = new Buffer(msg);
    let o = this;
    let hdr = {};
    o.header=hdr;
    o.flows = [];

    hdr.sflowVersion = buf.readUInt32BE(0);
    hdr.ipVersion = buf.readUInt32BE(4);
    let types = [null,"IPv4","IPv6"];
    hdr.ipVersionText = types[hdr.ipVersion]||"Unknown";

    console.log(`sflow: ${hdr.sflowVersion} ip:${hdr.ipVersionText}`)


});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);

});

server.bind(6343);
// server listening 0.0.0.0:41234