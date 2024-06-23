@extends("layouts.index")

@section('content')

    <h2 class="mb-4"><i class="fas fa-money-check-alt icon-sm"></i> Transactions</h2>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-sm">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Recipient</th>
                    <th>Amount (without fees)</th>
                    <th>Amount (with fees)</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->id }}</td>
                    <td>{{ $transaction->user->name }}</td>
                    @php
                    $recipient_rib = json_decode($transaction->recipient_rib, true);
                    @endphp
                    <td>{{ $recipient_rib['accountName'] }}</td>
                    <td>{{ $transaction->amountsansfrais }}</td>
                    <td>{{ $transaction->amountavecfrais }}</td>
                    <td>{{ $transaction->created_at->format('d/m/Y H:i:s') }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewTransaction({{ $transaction->id }})">
                            <i class="fas fa-eye icon-sm"></i> View
                        </button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="modal fade" id="transactionModal" tabindex="-1" role="dialog" aria-labelledby="transactionModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="transactionModalLabel">Transaction Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="transactionDetails"></div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        function viewTransaction(id) {
            fetch(`/transactions/${id}`)
                .then(response => response.json())
                .then(transaction => {
                    const recipientRib = JSON.parse(transaction.recipient_rib);

                    const details = `
                        <div class="p-3">
                            <p><strong>ID:</strong> ${transaction.id}</p>
                            <p><strong>User:</strong> ${transaction.user.name}</p>
                            <p><strong>Recipient:</strong> ${recipientRib.accountName}</p>
                            <p><strong>Recipient RIB:</strong> ${recipientRib.rib}</p>
                            <p><strong>Amount (without fees):</strong> ${transaction.amountsansfrais}</p>
                            <p><strong>Amount (with fees):</strong> ${transaction.amountavecfrais}</p>
                            <p><strong>Date:</strong> ${transaction.created_at}</p>
                        </div>
                    `;
                    document.getElementById('transactionDetails').innerHTML = details;
                    $('#transactionModal').modal('show');
                })
                .catch(error => console.error('Error fetching transaction details:', error));
        }
    </script>
@endsection
